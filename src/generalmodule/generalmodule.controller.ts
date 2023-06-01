import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralmoduleService } from './generalmodule.service';
import { CreateGeneralmoduleDto } from './dto/create-generalmodule.dto';
import { UpdateGeneralmoduleDto } from './dto/update-generalmodule.dto';

@Controller('generalmodule')
export class GeneralmoduleController {
  constructor(private readonly generalmoduleService: GeneralmoduleService) {}

  @Post()
  create(@Body() createGeneralmoduleDto: CreateGeneralmoduleDto) {
    return this.generalmoduleService.create(createGeneralmoduleDto);
  }

  @Get()
  findAll() {
    return this.generalmoduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalmoduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGeneralmoduleDto: UpdateGeneralmoduleDto) {
    return this.generalmoduleService.update(+id, updateGeneralmoduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalmoduleService.remove(+id);
  }
}
