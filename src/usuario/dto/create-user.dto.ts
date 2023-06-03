import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

import { ROLES } from '../../constants/roles';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fisrtname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(ROLES)
  role: ROLES;
  @IsString()
  status: boolean;
}
