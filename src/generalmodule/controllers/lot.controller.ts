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
import { LotService } from '../services/lot.service';
import { CreateLotDto, UpdateLotDto } from '../dto/lot.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('lot')
export class LotController {
  constructor(private readonly lotService: LotService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotService.create(createLotDto);
  }

  @Roles('ADMIN', 'BASIC')
  @Get()
  findAll() {
    return this.lotService.findAll();
  }

  @Roles('ADMIN', 'BASIC')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.lotService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateLotDto: UpdateLotDto,
  ) {
    return this.lotService.update(+id, updateLotDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.lotService.remove(+id);
  }
}
