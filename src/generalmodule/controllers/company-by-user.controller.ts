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
import { CompanyByUserService } from '../services/company-by-user.service';
import {
  CreateCompanyByUserDto,
  UpdateCompanyByUserDto,
} from '../dto/company-by-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('company-by-user')
export class CompanyByUserController {
  constructor(private readonly companyByUserService: CompanyByUserService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createCompanyByUserDto: CreateCompanyByUserDto) {
    return this.companyByUserService.create(createCompanyByUserDto);
  }

  @Roles('ADMIN', 'BASIC')
  @Get()
  findAll() {
    return this.companyByUserService.findAll();
  }

  @Roles('ADMIN', 'BASIC')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.companyByUserService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateCompanyByUserDto: UpdateCompanyByUserDto,
  ) {
    return this.companyByUserService.update(+id, updateCompanyByUserDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.companyByUserService.remove(+id);
  }
}
