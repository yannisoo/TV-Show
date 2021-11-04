import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('show')
export class ShowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  content: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column({
    type: 'boolean',
    default: false
  })
  completed: boolean;

  @ManyToOne(() => UserEntity, (author) => author.shows)
  author: UserEntity;
}
