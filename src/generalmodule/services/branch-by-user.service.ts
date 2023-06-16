import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CompanyByUser } from '../entities/company-by-user.entity';
import { ErrorManager } from '../../utils/error.manager';
import {
  CreateBranchByUserDto,
  UpdateBranchByUserDto,
} from '../dto/branch-by-user.dto';
import { BranchByUser } from '../entities/branch-by-user.entity';

@Injectable()
export class BranchByUserService {
  constructor(
    @InjectRepository(BranchByUser)
    private readonly branchByUserRepository: Repository<BranchByUser>,
  ) {}

  //Crate
  // ...........................................................................
  async create(createBranchByUserDto: CreateBranchByUserDto) {
    try {
      return await this.branchByUserRepository.save(createBranchByUserDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<BranchByUser[]> {
    try {
      const branchesByUsers: BranchByUser[] = await this.branchByUserRepository
        .createQueryBuilder('branchByUser')
        .leftJoinAndSelect('branchByUser.branch', 'branch')
        .leftJoinAndSelect('branchByUser.user', 'user')
        .select([
          'branchByUser.id',
          'branch.id',
          'branch.name',
          'user.id',
          'user.username',
          'branchByUser.createdAt',
          'branchByUser.updatedAt',
        ])
        .getMany();
      if (!branchesByUsers || branchesByUsers.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Record not found',
        });
      }
      return branchesByUsers;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<BranchByUser> {
    try {
      const branchByUser: BranchByUser = await this.branchByUserRepository
        .createQueryBuilder('branchByUser')
        .leftJoinAndSelect('branchByUser.branch', 'branch')
        .leftJoinAndSelect('branchByUser.user', 'user')
        .where({ id })
        .getOne();
      if (!branchByUser) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Record not found',
        });
      }
      return branchByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateBranchByUserDto: UpdateBranchByUserDto,
  ): Promise<UpdateResult> {
    try {
      const branchByUser: UpdateResult =
        await this.branchByUserRepository.update(id, updateBranchByUserDto);
      if (branchByUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return branchByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const branchByUser: DeleteResult =
        await this.branchByUserRepository.delete(id);
      if (branchByUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return branchByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
