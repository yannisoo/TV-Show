import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO, UserSO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async login(data: UserDTO): Promise<UserSO> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED
      );
    }
    return user.sanitizeObject({ withToken: true });
  }

  async register(data: UserDTO): Promise<UserSO> {
    const { email } = data;
    let user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    } else {
      user = await this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.sanitizeObject({ withToken: true });
    }
  }

  async getProfile(email: string): Promise<UserSO> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new HttpException('Email does not exists', HttpStatus.NOT_FOUND);
    const myReturn = user.sanitizeObject({ withToken: true });
    return myReturn;
  }
}
