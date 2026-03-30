import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AmountEntryDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
