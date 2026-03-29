import { IsNotEmpty, IsNumber } from 'class-validator';

export class GroupMemberDto {
  @IsNumber()
  @IsNotEmpty()
  group_id: number;

  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @IsNumber()
  @IsNotEmpty()
  member_id: number;
}
