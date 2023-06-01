import { Test, TestingModule } from '@nestjs/testing';
import { GeneralmoduleService } from './generalmodule.service';

describe('GeneralmoduleService', () => {
  let service: GeneralmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralmoduleService],
    }).compile();

    service = module.get<GeneralmoduleService>(GeneralmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
