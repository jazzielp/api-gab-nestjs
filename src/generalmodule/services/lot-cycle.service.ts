import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateLotCycleDto, UpdateLotCycleDto } from '../dto/lot-cycle.dto';
import { LotCycle } from '../entities/lot-cycle.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class LotCycleService {
  constructor(
    @InjectRepository(LotCycle)
    private readonly lotCycleRepository: Repository<LotCycle>, //Injection to use the repository of the entity
  ) {}

  //Crate
  // ...........................................................................
  async create(createLotCycleDto: CreateLotCycleDto) {
    try {
      return await this.lotCycleRepository.save(createLotCycleDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<LotCycle[]> {
    try {
      const LotCycles: LotCycle[] = await this.lotCycleRepository
        .createQueryBuilder('lotCycle')
        .leftJoinAndSelect('lotCycle.crop', 'crop')
        .leftJoinAndSelect('lotCycle.lot', 'lot')
        .leftJoinAndSelect('lotCycle.cycle', 'cycle')
        .select([
          'lotCycle.id',
          'lotCycle.haston',
          'lotCycle.status',
          'crop.id',
          'crop.name',
          'lot.id',
          'lot.name',
          'cycle.id',
          'cycle.cycle',
        ])
        .getMany();
      if (!LotCycles || LotCycles.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Lot Cycles not found',
        });
      }
      return LotCycles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<LotCycle> {
    try {
      const lotCycle: LotCycle = await this.lotCycleRepository.findOneBy({
        id,
      });
      if (!lotCycle) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Lot Cycle not found',
        });
      }
      return lotCycle;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateLotCycleDto: UpdateLotCycleDto,
  ): Promise<UpdateResult> {
    try {
      const lotCycle: UpdateResult = await this.lotCycleRepository.update(
        id,
        updateLotCycleDto,
      );
      if (lotCycle.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return lotCycle;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const lotCycle: DeleteResult = await this.lotCycleRepository.delete(id);
      if (lotCycle.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return lotCycle;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
