import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseController } from './controllers/add-expense.controller';
import { GetUserExpensesController } from './controllers/get-user-expenses.controller';

@Module({
  controllers: [AddExpenseController, GetUserExpensesController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
