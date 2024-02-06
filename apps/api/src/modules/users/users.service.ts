import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { PrismaService } from '@nq-capital/service-database';
import { GraphQLError } from 'graphql';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.prisma.user.create({ data: createUserInput });

    return user;
  }

  async list(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({});

    return users;
  }

  async retrieve(params: { id: number }) {
    const user = await this.prisma.user.findUnique({
      where: { id: params.id },
    });

    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    throw new GraphQLError('Not implemented');
  }

  remove(id: number) {
    throw new GraphQLError('Not implemented');
  }
}
