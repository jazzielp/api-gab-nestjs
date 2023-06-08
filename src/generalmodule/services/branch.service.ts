import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateBranchDto, UpdateBranchDto } from '../dto/branch.dto';
import { Branch } from '../entities/branch.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>, //Injection to use the repository of the entity
  ) {}

  //Crate
  // ...........................................................................
  async create(createBranchDto: CreateBranchDto) {
    try {
      return await this.branchRepository.save(createBranchDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<Branch[]> {
    try {
      const branches: Branch[] = await this.branchRepository.find();
      if (!branches || branches.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Branch not found',
        });
      }
      return branches;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<Branch> {
    try {
      const branch: Branch = await this.branchRepository.findOneBy({ id });
      if (!branch) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Branch not found',
        });
      }
      return branch;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateBranchDto: UpdateBranchDto,
  ): Promise<UpdateResult> {
    try {
      const branch: UpdateResult = await this.branchRepository.update(
        id,
        updateBranchDto,
      );
      if (branch.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return branch;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const branch: DeleteResult = await this.branchRepository.delete(id);
      if (branch.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return branch;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
