import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateCycleDto, UpdateCycleDto } from '../dto/cycle.dto';
import { Cycle } from '../entities/cycle.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class CycleService {
  constructor(
    @InjectRepository(Cycle)
    private readonly cycleRepository: Repository<Cycle>, //Injection to use the repository of the entity
  ) {}

  //Crate
  // ...........................................................................
  async create(createCycleDto: CreateCycleDto) {
    try {
      //Getting the year to create the cycle field
      //.........................................................................
      const { startDate, endDate } = createCycleDto;
      const startYear = new Date(startDate).getFullYear();
      const endYear = new Date(endDate).getFullYear();
      const strinCycle = `${startYear}-${endYear}`;
      const cycle = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        cycle: strinCycle,
      };

      return await this.cycleRepository.save(cycle);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<Cycle[]> {
    try {
      const cycles: Cycle[] = await this.cycleRepository.find();
      if (!cycles || cycles.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cycles not found',
        });
      }
      return cycles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<Cycle> {
    try {
      const cycle: Cycle = await this.cycleRepository.findOne({
        relations: ['lotCycles', 'lotCycles.lot', 'lotCycles.crop'],
        where: { id },
      });
      if (!cycle) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Cycle not found',
        });
      }
      return cycle;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateCycleDto: UpdateCycleDto,
  ): Promise<UpdateResult> {
    try {
      const cycle: UpdateResult = await this.cycleRepository.update(
        id,
        updateCycleDto,
      );
      if (cycle.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return cycle;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const cycle: DeleteResult = await this.cycleRepository.delete(id);
      if (cycle.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return cycle;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
