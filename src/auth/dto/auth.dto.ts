import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';

export class AuthDto {
  @IsEmail({})
  @IsNotEmpty()
  email: string;

  @IsAlphanumeric('en', {
    message: 'Password should contain number and string only',
  })
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}
