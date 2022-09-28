import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
//
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { TokenType } from './types';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login(): Promise<TokenType> {
    return {
      access_token: '',
      refresh_token: '',
    };
  }

  async logout() {}

  async refresh() {}

  async signup(dto: AuthDto) {
    const hash = await this.hash(dto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        hash_password: hash,
      },
    });
  }

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
}
