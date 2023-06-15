import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyByUser } from '../entities/company-by-user.entity';
import { ErrorManager } from '../../utils/error.manager';
import { CreateCompanyByUserDto } from '../dto/company-by-user.dto';

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
}
