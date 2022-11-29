import { AppService } from './app.service';
export declare class CreatePaymentDTO {
    secret: string;
    value: number;
}
export declare class ClaimPaymentOrderDTO {
    id: number;
    secret: string;
    address: string;
}
export declare class ClaimTokensDto {
    address: string;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getAnother(): string;
    getLastBlock(): any;
    getBlockByHash(hash: string): Promise<import("@ethersproject/abstract-provider").Block>;
    getBlockByAddress(address: string): Promise<import("@ethersproject/abstract-provider").Block>;
    geAllowance(address: string, owner: string, spender: string): Promise<string>;
    getPaymentOrder(id: string): Promise<{
        id: string;
        value: any;
    }>;
    createPaymentOrder(body: CreatePaymentDTO): Promise<number>;
    claimPaymentOrder(body: ClaimPaymentOrderDTO): Promise<any>;
    claimTokens(body: ClaimTokensDto): Promise<{
        result: string;
    }>;
}
