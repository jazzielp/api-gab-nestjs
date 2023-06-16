import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { WarehouseByUserService } from '../services/warehouse-by-user.service';
import {
  CreateWarehouseByUserDto,
  UpdateWarehouseByUserDto,
} from '../dto/warehouse-by-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('warehouse-by-user')
export class WarehouseByUserController {
  constructor(
    private readonly warehouseByUserService: WarehouseByUserService,
  ) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createWarehouseByUserDto: CreateWarehouseByUserDto) {
    return this.warehouseByUserService.create(createWarehouseByUserDto);
  }

  @Roles('ADMIN', 'BASIC')
  @Get()
  findAll() {
    return this.warehouseByUserService.findAll();
  }

  @Roles('ADMIN', 'BASIC')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.warehouseByUserService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateWarehouseByUserDto: UpdateWarehouseByUserDto,
  ) {
    return this.warehouseByUserService.update(+id, updateWarehouseByUserDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.warehouseByUserService.remove(+id);
  }
}
