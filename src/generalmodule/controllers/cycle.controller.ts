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
import { CycleService } from '../services/cycle.service';
import { CreateCycleDto, UpdateCycleDto } from '../dto/cycle.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('cycle')
export class CycleController {
  constructor(private readonly cycleService: CycleService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createCycleDto: CreateCycleDto) {
    return this.cycleService.create(createCycleDto);
  }

  @Roles('ADMIN', 'BASIC')
  @Get()
  findAll() {
    return this.cycleService.findAll();
  }

  @Roles('ADMIN', 'BASIC')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.cycleService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCycleDto: UpdateCycleDto,
  ) {
    return this.cycleService.update(+id, updateCycleDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.cycleService.remove(+id);
  }
}
