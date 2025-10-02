import { IsNumberString } from 'class-validator';

export class FindOneUserParams {
  @IsNumberString()
  id: number;
}
