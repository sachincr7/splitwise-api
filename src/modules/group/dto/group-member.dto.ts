import { IsNotEmpty, IsNumber } from 'class-validator';

export class GroupMemberDto {
  @IsNumber()
  @IsNotEmpty()
  groupId: number;

  @IsNumber()
  @IsNotEmpty()
  creatorId: number;

  @IsNumber()
  @IsNotEmpty()
  memberId: number;
}
