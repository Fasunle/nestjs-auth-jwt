import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
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
  async login(@Body() user: {email: string; password: string;}): Promise<TokenType> {
    return this.authService.login();
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return this.authService.logout();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(){
    return this.authService.refresh();
  }
}
