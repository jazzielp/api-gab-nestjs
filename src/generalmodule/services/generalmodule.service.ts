import { Injectable } from '@nestjs/common';
import { CreateGeneralmoduleDto } from '../dto/create-generalmodule.dto';
import { UpdateGeneralmoduleDto } from '../dto/update-generalmodule.dto';

@Injectable()
export class GeneralmoduleService {
  create(createGeneralmoduleDto: CreateGeneralmoduleDto) {
    return 'This action adds a new generalmodule';
  }

  findAll() {
    return `This action returns all generalmodule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalmodule`;
  }

  update(id: number, updateGeneralmoduleDto: UpdateGeneralmoduleDto) {
    return `This action updates a #${id} generalmodule`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalmodule`;
  }
}
