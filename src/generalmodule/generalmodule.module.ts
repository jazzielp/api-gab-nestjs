import { Module } from '@nestjs/common';
import { GeneralmoduleService } from './generalmodule.service';
import { GeneralmoduleController } from './generalmodule.controller';

@Module({
  controllers: [GeneralmoduleController],
  providers: [GeneralmoduleService]
})
export class GeneralmoduleModule {}
