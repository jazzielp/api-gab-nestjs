import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLotCycleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly lot: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly cycle: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly crop: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  haston: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  status: boolean;
}

export class UpdateLotCycleDto extends PartialType(CreateLotCycleDto) {}
