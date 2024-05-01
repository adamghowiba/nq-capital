import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nq-capital/service-database';
import { GraphQLError } from 'graphql';
import { CreateUserInput } from './dto/create-user.input';
import { ListUserArgs } from './dto/get-user.args';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { ApiError } from '../../common/exceptions/api.error';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await hash(createUserInput.password, 10);

    const user = await this.prisma.user.create({
      data: { ...createUserInput, password: hashedPassword },
    });

    return user;
  }

  async list(params: ListUserArgs): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      where: {
        role: params?.role,
      },
      ...params.offset,
    });

    return users;
  }

  async retrieve(params: { id: number }): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) throw new ApiError('User not found', { statusCode: 404 });

    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const hashedPassword = updateUserInput.password
      ? await hash(updateUserInput.password, 10)
      : undefined;

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserInput, password: hashedPassword },
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({ where: { id } });

    return user;
  }
}
