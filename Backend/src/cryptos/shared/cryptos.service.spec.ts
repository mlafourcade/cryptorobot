import { Test, TestingModule } from '@nestjs/testing';
import { CryptosService } from './cryptos.service';

describe('CryptosService', () => {
  let provider: CryptosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptosService],
    }).compile();

    provider = module.get<CryptosService>(CryptosService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
