import { Body, Controller, Post, Version } from '@nestjs/common';
import { ExpenseService } from '../expense.service';
import { AddExpenseDto } from '../dto/add-expense.dto';

@Controller('expenses')
export class AddExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @Version('1')
  async handle(@Body() dto: AddExpenseDto) {
    return this.expenseService.createExpense(dto);
  }
}
