import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ExpenseService } from '../expense.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/entities/enums/role.enum';

@Controller('expenses')
export class GetGroupExpensesController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Roles(Role.USER)
  @Get('group/:group_id')
  @Version('1')
  async handle(@Param('group_id', ParseIntPipe) group_id: number) {
    return this.expenseService.getGroupExpenses(group_id);
  }
}
