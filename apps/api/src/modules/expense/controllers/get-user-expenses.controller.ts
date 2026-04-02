import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ExpenseService } from '../expense.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('expenses')
export class GetUserExpensesController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Roles(Role.USER)
  @Get('user/:user_id')
  @Version('1')
  async handle(@Param('user_id', ParseIntPipe) user_id: number) {
    return this.expenseService.getUserExpenses(user_id);
  }
}
