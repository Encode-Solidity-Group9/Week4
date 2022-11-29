import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
export declare class PaymentOrderModel {
    id: number;
    secret: string;
    value: number;
}
export declare class AppService {
    private configService;
    provider: any;
    paymentOrders: PaymentOrderModel[];
    constructor(configService: ConfigService);
    getHello(): string;
    getAnother(): string;
    getBlock(hash: string): Promise<ethers.providers.Block>;
    getLastBlock(): Promise<ethers.providers.Block>;
    getTotalSupply(address: string): Promise<string>;
    getAllowance(address: string, owner: string, spender: string): Promise<string>;
    getPaymentOrder(id: string): {
        id: string;
        value: any;
    };
    createPaymentOrder(secret: string, value: number): number;
    claimPaymentOrder(id: number, secret: string, address: string): Promise<any>;
    claimTokens(address: string): Promise<{
        result: string;
    }>;
}
