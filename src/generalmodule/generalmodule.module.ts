import { Module } from '@nestjs/common';
import { GeneralmoduleService } from './services/generalmodule.service';
import { GeneralmoduleController } from './controllers/generalmodule.controller';

@Module({
  controllers: [GeneralmoduleController],
  providers: [GeneralmoduleService]
})
export class GeneralmoduleModule {}
