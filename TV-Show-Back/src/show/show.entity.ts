import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('show')
export class ShowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  showId: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column({
    type: 'boolean',
    default: false
  })
  completed: boolean;

  @ManyToOne(() => UserEntity, (author) => author.shows, {
    onDelete: 'CASCADE'
  })
  author: UserEntity;
}
