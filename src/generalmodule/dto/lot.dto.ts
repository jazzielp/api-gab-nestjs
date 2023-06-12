import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TYPE_LOT } from '../../constants/type-lot';

export class CreateLotDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TYPE_LOT)
  type: TYPE_LOT;
}

export class UpdateLotDto extends PartialType(CreateLotDto) {}
