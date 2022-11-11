import { Body, Controller, Get, Post } from '@nestjs/common';
import { Cryptos } from './shared/cryptos';
import { CryptosService } from './shared/cryptos.service';

@Controller('cryptos')
export class CryptosController {
  constructor(private readonly cryptosService: CryptosService) {}

  @Get()
  getHello(): string {
    return this.cryptosService.getHelloFront();
  }
  @Post()
  async getCryptoData(@Body() cryptos: Cryptos): Promise<JSON> {
    return this.cryptosService.getCryptoData(cryptos);
  }
}
