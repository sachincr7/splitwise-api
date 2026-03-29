import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';

export class PercentageEntryDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsPositive()
  @Max(100)
  percentage: number;
}
