import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCropDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  isCrop: boolean;
}

export class UpdateCropDto extends PartialType(CreateCropDto) {}
