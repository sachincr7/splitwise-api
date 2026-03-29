import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseGroupEntity } from 'src/entities/expense-group.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class GroupService {
  private userRepo: Repository<UserEntity>;
  private expenseGroupRepo: Repository<ExpenseGroupEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(UserEntity);
    this.expenseGroupRepo = this.dataSource.getRepository(ExpenseGroupEntity);
  }

  async createGroup(name: string, creatorId: number, memberIds: number[]) {
    const user = await this.userRepo.findOneBy({ id: creatorId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const members = await this.userRepo.find({ where: { id: In(memberIds) } });

    // Add creator to members list
    members.push(user);

    // Create group and add members
    const group = this.expenseGroupRepo.create({
      name,
      owner: user,
      members,
    });

    return group;
  }

  async addMember(groupId: number, creatorId: number, memberId: number) {
    const group = await this.expenseGroupRepo.findOne({
      where: { id: groupId },
      relations: ['owner', 'members'],
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check if creator is the owner
    if (group.owner.id !== creatorId) {
      throw new NotFoundException('You are not the owner of this group');
    }

    // Find the user to add
    const user = await this.userRepo.findOneBy({ id: memberId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user is already a member
    const isMember = group.members.some((m) => m.id === user.id);
    if (isMember) {
      throw new Error('User is already a member of this group');
    }

    group.members.push(user);

    // Save the updated group
    const savedGroup = await this.expenseGroupRepo.save(group);
    return savedGroup;
  }

  async removeMember(groupId: number, creatorId: number, memberId: number) {
    const group = await this.expenseGroupRepo.findOne({
      where: { id: groupId },
      relations: ['owner', 'members'],
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check if creator is the owner
    if (group.owner.id !== creatorId) {
      throw new NotFoundException('You are not the owner of this group');
    }

    // Find the user to remove
    const user = await this.userRepo.findOneBy({ id: memberId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user is a member
    const isMember = group.members.some((m) => m.id === user.id);
    if (!isMember) {
      throw new Error('User is not a member of this group');
    }

    // Remove the user from members
    group.members = group.members.filter((m) => m.id !== user.id);

    // Save the updated group
    const savedGroup = await this.expenseGroupRepo.save(group);
    return savedGroup;
  }

  async getGroup(groupId: number) {
    const group = await this.expenseGroupRepo.findOneBy({ id: groupId });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }
}
