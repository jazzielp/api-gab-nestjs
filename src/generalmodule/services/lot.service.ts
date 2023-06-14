import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateLotDto, UpdateLotDto } from '../dto/lot.dto';
import { Lot } from '../entities/lot.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class LotService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepository: Repository<Lot>, //Injection to use the repository of the entity
  ) {}

  //Crate
  // ...........................................................................
  async create(createLotDto: CreateLotDto) {
    try {
      return await this.lotRepository.save(createLotDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<Lot[]> {
    try {
      const lots: Lot[] = await this.lotRepository.find();
      if (!lots || lots.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Lots not found',
        });
      }
      return lots;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<Lot> {
    try {
      const lot: Lot = await this.lotRepository.findOne({
        relations: ['lotCycles'],
        where: { id },
      });
      if (!lot) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Lot not found',
        });
      }
      return lot;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(id: number, updateLotDto: UpdateLotDto): Promise<UpdateResult> {
    try {
      const lot: UpdateResult = await this.lotRepository.update(
        id,
        updateLotDto,
      );
      if (lot.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return lot;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const lot: DeleteResult = await this.lotRepository.delete(id);
      if (lot.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return lot;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
