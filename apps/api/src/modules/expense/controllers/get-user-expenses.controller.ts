import { Controller, Get, Param, ParseIntPipe, UseGuards, Version } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExpenseService } from '../expense.service';

@Controller('expenses')
export class GetUserExpensesController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('user/:user_id')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async handle(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.expenseService.getUserExpenses(user_id);
  }
}
