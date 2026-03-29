import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SplitType } from 'src/entities/enums/split-type.enum';
import { PaidByEntryDto } from './paid-by-entry.dto';
import { PercentageEntryDto } from './percentage-entry.dto';

export class AddExpenseDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(SplitType)
  @IsNotEmpty()
  split_type: SplitType;

  @IsNumber()
  @IsPositive()
  expense: number;

  @IsNumber()
  @IsNotEmpty()
  group_id: number;

  @IsNumber()
  @IsNotEmpty()
  created_by: number;

  @IsArray()
  @IsNumber({}, { each: true })
  user_ids: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaidByEntryDto)
  paid_by: PaidByEntryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PercentageEntryDto)
  percentages?: PercentageEntryDto[];
}
