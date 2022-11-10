import { Test, TestingModule } from '@nestjs/testing';
import { KlinesService } from './klines.service';

describe('KlinesService', () => {
  let provider: KlinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KlinesService],
    }).compile();

    provider = module.get<KlinesService>(KlinesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
