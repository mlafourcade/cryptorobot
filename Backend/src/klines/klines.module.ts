import { KlinesService } from './shared/klines.service';
import { KlinesController } from './klines.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [KlinesController],
  providers: [KlinesService],
})
export class KlinesModule {}
