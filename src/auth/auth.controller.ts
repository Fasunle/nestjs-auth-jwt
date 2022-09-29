import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginAuthDto } from './dto';
import { TokenType } from './types';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupInfo: AuthDto) {
    return this.authService.signup(signupInfo);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginAuthDto): Promise<TokenType> {
    return this.authService.login(dto);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh() {
    return this.authService.refresh();
  }
}
