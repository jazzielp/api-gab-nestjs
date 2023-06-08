import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './controllers/company.controller';
import { Company } from './entities/company.entity';
import { CompanyService } from './services/company.service';
import { UserModule } from '../usuario/user.module';
import { BranchService } from './services/branch.service';
import { BranchController } from './controllers/branch.controller';
import { Branch } from './entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Branch]), UserModule],
  controllers: [CompanyController, BranchController],
  providers: [CompanyService, BranchService],
})
export class GeneralmoduleModule {}
