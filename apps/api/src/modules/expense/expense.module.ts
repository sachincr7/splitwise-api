import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseController } from './controllers/add-expense.controller';
import { GetUserExpensesController } from './controllers/get-user-expenses.controller';
import { EqualSplitStrategy } from 'src/modules/split/strategies/equal-split.strategy';
import { PercentageSplitStrategy } from 'src/modules/split/strategies/percentage-split.strategy';

@Module({
  controllers: [AddExpenseController, GetUserExpensesController],
  providers: [ExpenseService, EqualSplitStrategy, PercentageSplitStrategy],
})
export class ExpenseModule {}
