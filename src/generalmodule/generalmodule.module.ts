import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './controllers/company.controller';
import { Company } from './entities/company.entity';
import { CompanyService } from './services/company.service';
import { UserModule } from '../usuario/user.module';
import { BranchService } from './services/branch.service';
import { BranchController } from './controllers/branch.controller';
import { Branch } from './entities/branch.entity';
import { WarehouseService } from './services/warehouse.service';
import { WarehouseController } from './controllers/warehouse.controller';
import { Warehouse } from './entities/warehouse.entity';
import { CropService } from './services/crop.service';
import { CropController } from './controllers/crop.controller';
import { Crop } from './entities/crop.entity';
import { LotService } from './services/lot.service';
import { LotController } from './controllers/lot.controller';
import { Lot } from './entities/lot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Branch, Warehouse, Crop, Lot]),
    UserModule,
  ],
  controllers: [
    CompanyController,
    BranchController,
    WarehouseController,
    CropController,
    LotController,
  ],
  providers: [
    CompanyService,
    BranchService,
    WarehouseService,
    CropService,
    LotService,
  ],
})
export class GeneralmoduleModule {}
