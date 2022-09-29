import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { TokenType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(): Promise<TokenType> {
    return {
      access_token: '',
      refresh_token: '',
    };
  }

  async logout() {}

  async refresh() {}

  async signup(dto: AuthDto): Promise<TokenType> {
    const hash = await this.hash(dto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        email: dto.email,
        hash_password: hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  /**
   *
   * @param userId number
   * @param email user email
   * @returns access_token and refresh_token
   */
  async getTokens(userId: number, email: string): Promise<TokenType> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 15, // 15 minutes
          secret: process.env.ACCESS_TOKEN_SECRET,
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7, // 1 week
          secret: process.env.REFRESH_TOKEN_SECRET,
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * Update refresh_token hash to the database.
   * @param userId number
   * @param refreshToken string
   */
  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hash_refresh_token = await this.hash(refreshToken);
    // update the refresh_token on the database
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        hash_refresh_token,
      },
    });
  }
}
