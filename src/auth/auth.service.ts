import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginAuthDto } from './dto';
import { TokenType } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Signin an existing user and generate tokens.
   * @param dto only email and password is required for signin
   * @returns access_token and refresh_token
   */
  async login(
    dto: LoginAuthDto, // class must be used to make class-validators work
  ): Promise<TokenType> {
    // find user with unique email address
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');
    // verify the given password with password on the database
    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.hash_password,
    );
    // check if password matches
    if (!passwordMatches)
      throw new ForbiddenException('Username or Password is incorrect');

    // get tokens and update refresh_token to database
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  /**
   * Logout a user
   * @param email
   */
  async logout(email: string) {
    // set refresh_token hash to null in the database
    await this.prismaService.user.updateMany({
      where: {
        email,
        hash_refresh_token: {
          not: null,
        },
      },
      data: {
        hash_refresh_token: null,
      },
    });
  }

  async refresh(email: string, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    // check if the user has any refresh token before
    const matchesRefreshToken = await bcrypt.compare(
      refreshToken,
      user.hash_refresh_token,
    );

    if (!matchesRefreshToken) throw new ForbiddenException('Login instead!');

    // get tokens and update refresh_token to database
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signup(dto: AuthDto): Promise<TokenType> {
    const hash = await this.hash(dto.password);

    const oldUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldUser)
      throw new BadRequestException('User with this email already exist!');

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
