import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  creatorId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  memberIds: number[];
}
