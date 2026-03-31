import { Body, Controller, Post, UseGuards, Version } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExpenseService } from '../expense.service';
import { AddExpenseDto } from '../dto/add-expense.dto';

@Controller('expenses')
export class AddExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async handle(@Body() dto: AddExpenseDto) {
    return this.expenseService.createExpense(dto);
  }
}
