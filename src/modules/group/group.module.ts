import { Module } from '@nestjs/common';
import { CreateGroupController } from './controllers/create-group.controller';
import { AddMemberController } from './controllers/add-member.controller';
import { RemoveMemberController } from './controllers/remove-member.controller';
import { GetGroupController } from './controllers/get-group.controller';
import { GroupService } from './group.service';

@Module({
  controllers: [
    CreateGroupController,
    AddMemberController,
    RemoveMemberController,
    GetGroupController,
  ],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
