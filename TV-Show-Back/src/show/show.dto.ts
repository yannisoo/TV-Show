import { IsString, IsBoolean } from 'class-validator';
import { UserSO } from 'src/user/user.dto';

export class ShowDTO {
  @IsString()
  content: string;

  @IsBoolean()
  seen: boolean;
}

export type ShowSO = {
  id: string;
  createdOn: Date;
  completed: boolean;
  author: UserSO;
};
