import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CompanyByUser } from '../entities/company-by-user.entity';
import { ErrorManager } from '../../utils/error.manager';
import {
  CreateCompanyByUserDto,
  UpdateCompanyByUserDto,
} from '../dto/company-by-user.dto';

@Injectable()
export class CompanyByUserService {
  constructor(
    @InjectRepository(CompanyByUser)
    private readonly companyByUserRepository: Repository<CompanyByUser>,
  ) {}

  //Crate
  // ...........................................................................
  async create(createCompanyByUserDto: CreateCompanyByUserDto) {
    try {
      return await this.companyByUserRepository.save(createCompanyByUserDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<CompanyByUser[]> {
    try {
      const companiesByUsers: CompanyByUser[] =
        await this.companyByUserRepository
          .createQueryBuilder('companyByUser')
          .leftJoinAndSelect('companyByUser.company', 'company')
          .leftJoinAndSelect('companyByUser.user', 'user')
          .select([
            'companyByUser.id',
            'company.id',
            'company.name',
            'user.id',
            'user.username',
            'companyByUser.createdAt',
            'companyByUser.updatedAt',
          ])
          .getMany();
      if (!companiesByUsers || companiesByUsers.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Company not found',
        });
      }
      return companiesByUsers;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<CompanyByUser> {
    try {
      const companyByUser: CompanyByUser = await this.companyByUserRepository
        .createQueryBuilder('companyByUser')
        .leftJoinAndSelect('companyByUser.company', 'company')
        .leftJoinAndSelect('companyByUser.user', 'user')
        .where({ id })
        .getOne();
      if (!companyByUser) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Recond not found',
        });
      }
      return companyByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateCompanyByUserDto: UpdateCompanyByUserDto,
  ): Promise<UpdateResult> {
    try {
      const companyByUser: UpdateResult =
        await this.companyByUserRepository.update(id, updateCompanyByUserDto);
      if (companyByUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return companyByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const companyByUser: DeleteResult =
        await this.companyByUserRepository.delete(id);
      if (companyByUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return companyByUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
