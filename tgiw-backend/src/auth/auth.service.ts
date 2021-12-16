import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as firebaseAdmin from 'firebase-admin';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private firebaseParams = this.configService.get('firebase');

  firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(this.firebaseParams),
  });

  async validateUsername(userName: string): Promise<void> {
    const foundUser = await this.userRepository.findOne({
      where: { userName },
    });

    if (foundUser) {
      throw new ConflictException('Username already exists');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { userName, ...restOfDto } = createUserDto;

    await this.validateUsername(userName);

    try {
      const user = await firebaseAdmin.auth().createUser(restOfDto);
      const { uid: id } = user;

      const localUser = this.userRepository.create({ id, userName });
      await this.userRepository.save(localUser);

      return user;
    } catch (error) {
      // Internal server error used because Firebase error codes are strings (and plentiful)
      throw new InternalServerErrorException(error.errorInfo.message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await firebaseAdmin.auth().deleteUser(id);
      await this.userRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(error.errorInfo.message);
    }
  }

  async getUser(id: string) {
    try {
      const user = await firebaseAdmin.auth().getUser(id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.errorInfo.message);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await firebaseAdmin.auth().updateUser(id, updateUserDto);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.errorInfo.message);
    }
  }
}
