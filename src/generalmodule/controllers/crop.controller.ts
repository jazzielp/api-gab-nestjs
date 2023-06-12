import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CropService } from '../services/crop.service';
import { CreateCropDto, UpdateCropDto } from '../dto/crop.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('crop')
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropService.create(createCropDto);
  }

  @Roles('ADMIN', 'BASIC')
  @Get()
  findAll() {
    return this.cropService.findAll();
  }

  @Roles('ADMIN', 'BASIC')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.cropService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCropDto: UpdateCropDto,
  ) {
    return this.cropService.update(+id, updateCropDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.cropService.remove(+id);
  }
}
