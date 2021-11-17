import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowEntity } from './show.entity';
import { ShowDTO, ShowSO } from './show.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(ShowEntity)
    private showRepository: Repository<ShowEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private responseOject = (show: ShowEntity): ShowSO => {
    return {
      ...show,
      author: show.author.sanitizeObject(),
    };
  };

  private verifyOwnership = (show: ShowEntity, userId: string) => {
    if (show.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  };

  getAllShows = async (userId: string): Promise<ShowSO[]> => {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const shows = await this.showRepository.find({
      where: { author: user },
      order: { createdOn: 'DESC' },
      relations: ['author'],
    });
    return shows.map((show) => {
      this.verifyOwnership(show, userId);
      return this.responseOject(show);
    });
  };

  private _createShow = async (
    userId: string,
    showId: Extract<ShowDTO, 'content'>,
    seen: Extract<ShowDTO, 'seen'>,
  ): Promise<ShowSO> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const completed = 'true' ? true : false;
    const newShow = this.showRepository.create({
      showId,
      author: user,
      completed: completed,
    });
    await this.showRepository.save(newShow);

    return this.responseOject(newShow);
  };
  public get createShow() {
    return this._createShow;
  }
  public set createShow(value) {
    this._createShow = value;
  }

  updateShow = async (
    userId: string,
    id: string,
    data: Partial<ShowDTO>,
  ): Promise<ShowSO> => {
    const show = await this.showRepository.findOne(
      { id },
      { relations: ['author'] },
    );

    if (!show) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(show, userId);

    if (data.hasOwnProperty('completed')) {
      await this.showRepository.update({ id }, { completed: data.seen });
    }

    return this.responseOject(show);
  };

  deleteShow = async (userId: string, id: string): Promise<ShowSO> => {
    const show = await this.showRepository.findOne(
      { id },
      { relations: ['author'] },
    );

    if (!show) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(show, userId);

    await this.showRepository.remove(show);

    return this.responseOject(show);
  };
}
