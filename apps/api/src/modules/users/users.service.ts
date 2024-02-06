import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {


  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<UserEntity[]> {
    return [
      {
        avatar: 'http',
        created_at: new Date(),
        email: 'adam@web',
        first_name: 'adam',
        id: 1,
        last_name: 'smith',
        middle_name: 'dawd',
        mobile_number: 'dawd',
        password: 'dawd',
        role: 'ADMIN',
        updated_at: new Date(),
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
