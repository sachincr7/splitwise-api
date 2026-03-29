import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @IsArray()
  @IsNumber({}, { each: true })
  member_ids: number[];
}
