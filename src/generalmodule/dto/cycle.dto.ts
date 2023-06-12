import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCycleDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  status: boolean;
}

export class UpdateCycleDto extends PartialType(CreateCycleDto) {}
