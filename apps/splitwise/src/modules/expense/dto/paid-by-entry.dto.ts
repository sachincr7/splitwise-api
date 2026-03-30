import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PaidByEntryDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
