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
exports.UserDomainService = void 0;
const common_1 = require("@nestjs/common");
const commands_1 = require("../commands");
const models_1 = require("../models");
const queries_1 = require("../queries");
let UserDomainService = class UserDomainService {
    constructor(userQuery, registerUserCommand, updateConfirmEmailUserCommand) {
        this.userQuery = userQuery;
        this.registerUserCommand = registerUserCommand;
        this.updateConfirmEmailUserCommand = updateConfirmEmailUserCommand;
    }
    async getAllUser() {
        return await this.userQuery.getAll();
    }
    async createUser(registerUserCommandInputModel) {
        const result = await this.registerUserCommand.execute(registerUserCommandInputModel);
        return result.success;
    }
    async getUserByEmailOrUsername(textSearch) {
        const user = await this.userQuery.getUserByEmailOrUsername(textSearch);
        return user;
    }
    async confirmEmailUser(email) {
        const result = await this.updateConfirmEmailUserCommand.execute(new models_1.UpdateConfirmEmailUserInputModel({ email }));
        return result.success;
    }
};
UserDomainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [queries_1.UserQuery,
        commands_1.RegisterUserCommand,
        commands_1.UpdateConfirmEmailUserCommand])
], UserDomainService);
exports.UserDomainService = UserDomainService;
//# sourceMappingURL=user.domain.service.js.map