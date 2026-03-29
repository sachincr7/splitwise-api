import { IsNotEmpty, IsNumber } from 'class-validator';

export class GroupMemberDto {
  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @IsNumber()
  @IsNotEmpty()
  member_id: number;
}
