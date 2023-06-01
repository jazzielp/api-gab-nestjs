import { Test, TestingModule } from '@nestjs/testing';
import { GeneralmoduleController } from './generalmodule.controller';
import { GeneralmoduleService } from './generalmodule.service';

describe('GeneralmoduleController', () => {
  let controller: GeneralmoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralmoduleController],
      providers: [GeneralmoduleService],
    }).compile();

    controller = module.get<GeneralmoduleController>(GeneralmoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
