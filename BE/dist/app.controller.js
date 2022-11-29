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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.ClaimTokensDto = exports.ClaimPaymentOrderDTO = exports.CreatePaymentDTO = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
class CreatePaymentDTO {
}
exports.CreatePaymentDTO = CreatePaymentDTO;
class ClaimPaymentOrderDTO {
}
exports.ClaimPaymentOrderDTO = ClaimPaymentOrderDTO;
class ClaimTokensDto {
}
exports.ClaimTokensDto = ClaimTokensDto;
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getAnother() {
        return this.appService.getAnother();
    }
    getLastBlock() {
        return this.appService.getLastBlock();
    }
    getBlockByHash(hash) {
        return this.appService.getBlock(hash);
    }
    getBlockByAddress(address) {
        return this.appService.getBlock(address);
    }
    async geAllowance(address, owner, spender) {
        return await this.appService.getAllowance(address, owner, spender);
    }
    async getPaymentOrder(id) {
        return await this.appService.getPaymentOrder(id);
    }
    async createPaymentOrder(body) {
        return this.appService.createPaymentOrder(body.secret, body.value);
    }
    async claimPaymentOrder(body) {
        return await this.appService.claimPaymentOrder(body.id, body.secret, body.address);
    }
    async claimTokens(body) {
        return await this.appService.claimTokens(body.address);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('another'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getAnother", null);
__decorate([
    (0, common_1.Get)('last-block'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getLastBlock", null);
__decorate([
    (0, common_1.Get)('block-by-hash/:hash'),
    __param(0, (0, common_1.Param)('hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBlockByHash", null);
__decorate([
    (0, common_1.Get)('block-by-address/:address'),
    __param(0, (0, common_1.Param)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBlockByAddress", null);
__decorate([
    (0, common_1.Get)('allowance/:address/:owner/:spender'),
    __param(0, (0, common_1.Query)('address')),
    __param(1, (0, common_1.Query)('owner')),
    __param(2, (0, common_1.Query)('spender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "geAllowance", null);
__decorate([
    (0, common_1.Get)('payment-order/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPaymentOrder", null);
__decorate([
    (0, common_1.Post)('create-payment-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePaymentDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createPaymentOrder", null);
__decorate([
    (0, common_1.Post)('claim-payment-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClaimPaymentOrderDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "claimPaymentOrder", null);
__decorate([
    (0, common_1.Post)('claim-tokens'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ClaimTokensDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "claimTokens", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map