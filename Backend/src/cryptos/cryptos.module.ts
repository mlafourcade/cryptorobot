import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CryptosController } from './cryptos.controller';
import { CryptosService } from './shared/cryptos.service';

@Module({
  imports: [HttpModule],
  controllers: [CryptosController],
  providers: [CryptosService],
})
export class CryptosModule {}
