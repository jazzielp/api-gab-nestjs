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
import { LotCycleService } from '../services/lot-cycle.service';
import { CreateLotCycleDto, UpdateLotCycleDto } from '../dto/lot-cycle.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('lot-cycle')
export class LotCycleController {
  constructor(private readonly lotCycleService: LotCycleService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createLotCycleDto: CreateLotCycleDto) {
    return this.lotCycleService.create(createLotCycleDto);
  }

  @Roles('ADMIN', 'BASIC')
  @Get()
  findAll() {
    return this.lotCycleService.findAll();
  }

  @Roles('ADMIN', 'BASIC')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.lotCycleService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateLotCycleDto: UpdateLotCycleDto,
  ) {
    return this.lotCycleService.update(+id, updateLotCycleDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.lotCycleService.remove(+id);
  }
}
