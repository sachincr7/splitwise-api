import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ExpenseService } from '../expense.service';

@Controller('expenses')
export class GetUserExpensesController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('user/:user_id')
  @Version('1')
  async handle(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.expenseService.getUserExpenses(user_id);
  }
}
