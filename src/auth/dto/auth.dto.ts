import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class LoginAuthDto {
  @IsEmail({})
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
