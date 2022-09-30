import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DisableAccessToken, GetCurrentUser } from 'src/common/decorators';
import { RefreshTokenGaurd } from 'src/common/gaurds/refresh-token.gaurd';
import { AuthService } from './auth.service';
import { AuthDto, LoginAuthDto } from './dto';
import { TokenType } from './types';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @DisableAccessToken()
  async signup(@Body() signupInfo: AuthDto) {
    return this.authService.signup(signupInfo);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @DisableAccessToken()
  async login(@Body() dto: LoginAuthDto): Promise<TokenType> {
    return this.authService.login(dto);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser('email') email: string) {
    return this.authService.logout(email);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @DisableAccessToken()
  @UseGuards(RefreshTokenGaurd)
  async refresh(
    @GetCurrentUser('email') email: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refresh(email, refreshToken);
  }
}
