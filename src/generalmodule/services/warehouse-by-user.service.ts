import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { ErrorManager } from '../../utils/error.manager';
import {
  CreateWarehouseByUserDto,
  UpdateWarehouseByUserDto,
} from '../dto/warehouse-by-user.dto';
import { WarehouseByUser } from '../entities/warehouse-by-user.entity';

@Injectable()
export class WarehouseByUserService {
  constructor(
    @InjectRepository(WarehouseByUser)
    private readonly warehouseByUserRepository: Repository<WarehouseByUser>,
  ) {}

  //Crate
  // ...........................................................................
  async create(createWarehouseByUserDto: CreateWarehouseByUserDto) {
    try {
      return await this.warehouseByUserRepository.save(
        createWarehouseByUserDto,
      );
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<WarehouseByUser[]> {
    try {
      const warehousesByUsers: WarehouseByUser[] =
        await this.warehouseByUserRepository
          .createQueryBuilder('warehouseByUser')
          .leftJoinAndSelect('warehouseByUser.warehouse', 'warehouse')
          .leftJoinAndSelect('warehouseByUser.user', 'user')
          .select([
            'warehouseByUser.id',
            'warehouse.id',
            'warehouse.name',
            'user.id',
            'user.username',
            'warehouseByUser.createdAt',
            'warehouseByUser.updatedAt',
          ])
          .getMany();
      if (!warehousesByUsers || warehousesByUsers.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Record not found',
        });
      }
      return warehousesByUsers;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<WarehouseByUser> {
    try {
      const warehouseByUser: WarehouseByUser =
        await this.warehouseByUserRepository
          .createQueryBuilder('warehouseByUser')
          .leftJoinAndSelect('warehouseByUser.branch', 'warehouse')
          .leftJoinAndSelect('warehouseByUser.user', 'user')
          .where({ id })
          .getOne();
      if (!warehouseByUser) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Record not found',
        });
      }
      return warehouseByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateWarehouseByUserDto: UpdateWarehouseByUserDto,
  ): Promise<UpdateResult> {
    try {
      const warehouseByUser: UpdateResult =
        await this.warehouseByUserRepository.update(
          id,
          updateWarehouseByUserDto,
        );
      if (warehouseByUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return warehouseByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const warehouseByUser: DeleteResult =
        await this.warehouseByUserRepository.delete(id);
      if (warehouseByUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return warehouseByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
