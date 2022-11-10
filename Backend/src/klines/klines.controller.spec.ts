import { Test, TestingModule } from '@nestjs/testing';
import { KlinesController } from './klines.controller';

describe('KlinesController', () => {
  let controller: KlinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KlinesController],
    }).compile();

    controller = module.get<KlinesController>(KlinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
