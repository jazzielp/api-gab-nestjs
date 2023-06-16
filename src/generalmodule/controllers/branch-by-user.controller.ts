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
import { BranchByUserService } from '../services/branch-by-user.service';
import {
  CreateBranchByUserDto,
  UpdateBranchByUserDto,
} from '../dto/branch-by-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('branch-by-user')
export class BranchByUserController {
  constructor(private readonly branchByUserService: BranchByUserService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createBranchByUserDto: CreateBranchByUserDto) {
    return this.branchByUserService.create(createBranchByUserDto);
  }

  @Roles('ADMIN', 'BASIC')
  @Get()
  findAll() {
    return this.branchByUserService.findAll();
  }

  @Roles('ADMIN', 'BASIC')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.branchByUserService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBranchByUserDto: UpdateBranchByUserDto,
  ) {
    return this.branchByUserService.update(+id, updateBranchByUserDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.branchByUserService.remove(+id);
  }
}
