import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

export class CreatePaymentDTO {
  secret: string;
  value: number;
}

export class ClaimPaymentOrderDTO {
  id: number;
  secret: string;
  address: string;
}

export class ClaimTokensDto {
  address: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('another')
  getAnother(): string {
    return this.appService.getAnother();
  }

  @Get('last-block')
  getLastBlock(): any {
    return this.appService.getLastBlock();
  }

  @Get('block-by-hash/:hash')
  getBlockByHash(@Param('hash') hash: string) {
    return this.appService.getBlock(hash);
  }

  @Get('block-by-address/:address')
  getBlockByAddress(@Param('address') address: string) {
    return this.appService.getBlock(address);
  }

  @Get('allowance/:address/:owner/:spender')
  async geAllowance(
    @Query('address') address: string,
    @Query('owner') owner: string,
    @Query('spender') spender: string,
  ) {
    return await this.appService.getAllowance(address, owner, spender);
  }

  @Get('payment-order/:id')
  async getPaymentOrder(@Param('id') id: string) {
    return await this.appService.getPaymentOrder(id);
  }

  @Post('create-payment-order')
  async createPaymentOrder(@Body() body: CreatePaymentDTO) {
    return this.appService.createPaymentOrder(
      body.secret,
      body.value,
    );
  }

  @Post('claim-payment-order')
  async claimPaymentOrder(@Body() body: ClaimPaymentOrderDTO) {
    return await this.appService.claimPaymentOrder(
      body.id,
      body.secret,
      body.address,
    );
  }

  @Post('claim-tokens')
  async claimTokens(@Body() body: ClaimTokensDto) {
    return await this.appService.claimTokens(body.address);
  }

  // @Get('token-address')
  // async getTokenAddress(){
  //   return this.appService.claimTokens();
  // }
}
