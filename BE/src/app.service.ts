import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';
import any = jasmine.any;

export class PaymentOrderModel {
  id: number;
  secret: string;
  value: number;
}

@Injectable()
export class AppService {
  provider;
  paymentOrders: PaymentOrderModel[];

  constructor(private configService: ConfigService) {
    this.provider = ethers.getDefaultProvider('goerli');
    this.paymentOrders = [];
  }

  getHello(): string {
    return 'Hello World!';
  }

  getAnother(): string {
    return 'Another method';
  }

  getBlock(hash: string): Promise<ethers.providers.Block> {
    const providers = this.provider;
    return providers.getBlock(hash);
  }

  async getLastBlock(): Promise<ethers.providers.Block> {
    const providers = this.provider;
    return providers.getBlock('latest');
  }

  async getTotalSupply(address: string) {
    const contract = new ethers.Contract(address, tokenJson.abi, this.provider);
    const bigNumber = await contract.totalSupply();
    return ethers.utils.formatEther(bigNumber);
  }

  async getAllowance(address: string, owner: string, spender: string) {
    const contract = new ethers.Contract(address, tokenJson.abi, this.provider);
    const bigNumber = await contract.allowance(owner, spender);
    return ethers.utils.formatEther(bigNumber);
  }

  getPaymentOrder(id: string) {
    return { id: id, value: this.paymentOrders[id].value };
  }

  createPaymentOrder(secret: string, value: number) {
    const newPaymentOrder = new PaymentOrderModel();
    newPaymentOrder.secret = secret;
    newPaymentOrder.value = value;
    newPaymentOrder.id = this.paymentOrders.length;
    this.paymentOrders.push(newPaymentOrder);
    return newPaymentOrder.id;
  }

  async claimPaymentOrder(id: number, secret: string, address: string) {
    if (this.paymentOrders[id].secret != secret)
      throw new Error('Wrong secret!');
    const seed = this.configService.get<string>('MNEMONIC');
    const contractAddress = this.configService.get<string>('MNEMONIC');
    const wallet = ethers.Wallet.fromMnemonic(seed);
    const signer = wallet.connect(this.provider);
    const signedContract = new ethers.Contract(
      contractAddress,
      tokenJson.abi,
      signer,
    );
    const transaction = await signedContract.mint(
      address,
      ethers.utils.parseEther(this.paymentOrders[id].value.toString()),
    );
    return transaction.wait();
  }

  async claimTokens(address: string) {
    this.http
        .post<any>('http://localhost:3000/claim-tokens', {
          address: this.wallet? address,
        })
        .subscribe
    return { result: "this.claimTokens()" };
  }
}
