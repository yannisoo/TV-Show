import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShowEntity } from './show.entity';
import { ShowDTO } from './show.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(ShowEntity)
    private showRepository: Repository<ShowEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  private verifyOwnership = (show: ShowEntity, userId: string) => {
    if (show.author.id !== userId) {
      throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
    }
  };

  getAllShows = async (userId: string): Promise<ShowEntity[]> => {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    const shows = await this.showRepository.find({
      where: { author: user },
      order: { createdOn: 'DESC' },
      relations: ['author']
    });
    return shows;
  };

  private _createShow = async (
    userId: string,
    showId: Extract<ShowDTO, 'content'>,
    seen: Extract<ShowDTO, 'seen'>
  ): Promise<ShowEntity> => {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const completed = seen == true ? true : false;
    const newShow = this.showRepository.create({
      showId,
      author: user,
      completed: completed
    });
    await this.showRepository.save(newShow);

    return newShow;
  };
  public get createShow() {
    return this._createShow;
  }
  public set createShow(value) {
    this._createShow = value;
  }

  async updateShow(userId: string, id: string): Promise<ShowEntity> {
    const show = await this.showRepository.findOne(
      { showId: id },
      { relations: ['author'] }
    );

    if (!show) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(show, userId);

    const value = show.completed !== true ? true : false;
    this.showRepository.update({ showId: id }, { completed: value });
    return show;
  }
  async isItSaved(userId: string, id: string): Promise<ShowEntity> {
    const show = await this.showRepository.findOne(
      { showId: id },
      { relations: ['author'] }
    );

    if (!show) return null;
    this.verifyOwnership(show, userId);
    return show;
  }

  async deleteShow(userId: string, id: string): Promise<ShowEntity> {
    const show = await this.showRepository.findOne(
      { showId: id },
      { relations: ['author'] }
    );

    if (!show) throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    this.verifyOwnership(show, userId);

    await this.showRepository.remove(show);

    return show;
  }
}
