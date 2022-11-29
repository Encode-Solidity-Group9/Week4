"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = exports.PaymentOrderModel = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ethers_1 = require("ethers");
const tokenJson = require("./assets/MyToken.json");
class PaymentOrderModel {
}
exports.PaymentOrderModel = PaymentOrderModel;
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.provider = ethers_1.ethers.getDefaultProvider('goerli');
        this.paymentOrders = [];
    }
    getHello() {
        return 'Hello World!';
    }
    getAnother() {
        return 'Another method';
    }
    getBlock(hash) {
        const providers = this.provider;
        return providers.getBlock(hash);
    }
    async getLastBlock() {
        const providers = this.provider;
        return providers.getBlock('latest');
    }
    async getTotalSupply(address) {
        const contract = new ethers_1.ethers.Contract(address, tokenJson.abi, this.provider);
        const bigNumber = await contract.totalSupply();
        return ethers_1.ethers.utils.formatEther(bigNumber);
    }
    async getAllowance(address, owner, spender) {
        const contract = new ethers_1.ethers.Contract(address, tokenJson.abi, this.provider);
        const bigNumber = await contract.allowance(owner, spender);
        return ethers_1.ethers.utils.formatEther(bigNumber);
    }
    getPaymentOrder(id) {
        return { id: id, value: this.paymentOrders[id].value };
    }
    createPaymentOrder(secret, value) {
        const newPaymentOrder = new PaymentOrderModel();
        newPaymentOrder.secret = secret;
        newPaymentOrder.value = value;
        newPaymentOrder.id = this.paymentOrders.length;
        this.paymentOrders.push(newPaymentOrder);
        return newPaymentOrder.id;
    }
    async claimPaymentOrder(id, secret, address) {
        if (this.paymentOrders[id].secret != secret)
            throw new Error('Wrong secret!');
        const seed = this.configService.get('MNEMONIC');
        const contractAddress = this.configService.get('MNEMONIC');
        const wallet = ethers_1.ethers.Wallet.fromMnemonic(seed);
        const signer = wallet.connect(this.provider);
        const signedContract = new ethers_1.ethers.Contract(contractAddress, tokenJson.abi, signer);
        const transaction = await signedContract.mint(address, ethers_1.ethers.utils.parseEther(this.paymentOrders[id].value.toString()));
        return transaction.wait();
    }
    async claimTokens(address) {
        this.http
            .post('http://localhost:3000/claim-tokens', {
            address: this.wallet ? address : ,
        })
            .subscribe;
        return { result: "this.claimTokens()" };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map