import {
  Controller,
  Get,
  Param,
  Req,
  Query,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { Klines } from './shared/klines';
import { KlinesService } from './shared/klines.service';

@Controller('klines')
export class KlinesController {
  constructor(private klinesService: KlinesService) {}
  @Get()
  getKlines(): string {
    return this.klinesService.getKlines();
  }
  @Get(':parameters')
  getData(@Query() reqParam: Klines) {
    console.log(JSON.stringify(reqParam));

    const { symbol, interval } = reqParam;
    console.log('symbol = ', symbol);
    console.log('interval = ', interval);
  }
  @Post()
  async KlineData(@Body() kline: Klines): Promise<Klines> {
    return this.klinesService.KlineData(kline);
  }

  /*

  , @Res() res: Response
@Get(':framework')
getData(@Req() request: Request): Object {
    return {...request.params, ...request.query};
}
{
    "framework": "nest",
    "version": "7"
}*/

  @Get(':symbol')
  async getSymbolInterval(@Param('symbol') symbol: string): Promise<string> {
    return symbol;
  }
}

/*
como trazer um json do frontend via http como o create das tasks 

ou 

como tratar dois parametros que vem no querystring

*/
