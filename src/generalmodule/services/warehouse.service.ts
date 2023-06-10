import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateWarehouseDto, UpdateWarehouseDto } from '../dto/warehouse.dto';
import { Warehouse } from '../entities/warehouse.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>, //Injection to use the repository of the entity
  ) {}

  //Crate
  // ...........................................................................
  async create(createWarehouseDto: CreateWarehouseDto) {
    try {
      return await this.warehouseRepository.save(createWarehouseDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<Warehouse[]> {
    try {
      const warehouse: Warehouse[] = await this.warehouseRepository.find();
      if (!warehouse || warehouse.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }
      return warehouse;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<Warehouse> {
    try {
      const warehouse: Warehouse = await this.warehouseRepository.findOneBy({
        id,
      });
      if (!warehouse) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Warehouse not found',
        });
      }
      return warehouse;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<UpdateResult> {
    try {
      const warehouse: UpdateResult = await this.warehouseRepository.update(
        id,
        updateWarehouseDto,
      );
      if (warehouse.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return warehouse;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const warehouse: DeleteResult = await this.warehouseRepository.delete(id);
      if (warehouse.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return warehouse;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
