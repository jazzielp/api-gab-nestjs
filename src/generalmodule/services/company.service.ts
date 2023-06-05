import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';
import { Company } from '../entities/company.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>, //Injection to use the repository of the entity
  ) {}

  //Crate
  // ...........................................................................
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companyRepository.save(createCompanyDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findAll
  // ...........................................................................
  async findAll(): Promise<Company[]> {
    try {
      const companies: Company[] = await this.companyRepository.find();
      if (!companies || companies.length === 0) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Company not found',
        });
      }
      return companies;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //findOne
  // ...........................................................................
  async findOne(id: number): Promise<Company> {
    try {
      const company: Company = await this.companyRepository.findOneBy({ id });
      if (!company) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Company not found',
        });
      }
      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //update
  // ...........................................................................
  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<UpdateResult> {
    try {
      const company: UpdateResult = await this.companyRepository.update(
        id,
        updateCompanyDto,
      );
      if (company.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update record',
        });
      }
      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //remove
  // ...........................................................................
  async remove(id: number): Promise<DeleteResult> {
    try {
      const company: DeleteResult = await this.companyRepository.delete(id);
      if (company.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete record',
        });
      }
      return company;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
