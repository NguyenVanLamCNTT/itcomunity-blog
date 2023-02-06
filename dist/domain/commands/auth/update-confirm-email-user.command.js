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
exports.UpdateConfirmEmailUserCommand = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const exceptions_1 = require("../../exceptions");
const models_1 = require("../../models");
const repositories_1 = require("../../../infrastructure/database/repositories");
let UpdateConfirmEmailUserCommand = class UpdateConfirmEmailUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        console.log(input.email);
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new exceptions_1.UserNotExistException();
        }
        user.isConfirmEmail = true;
        this.userRepository.save(user);
        return new models_1.UpdateConfirmEmailUserResultModel({ success: true });
    }
};
UpdateConfirmEmailUserCommand = __decorate([
    (0, decorators_1.Injectable)({}),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], UpdateConfirmEmailUserCommand);
exports.UpdateConfirmEmailUserCommand = UpdateConfirmEmailUserCommand;
//# sourceMappingURL=update-confirm-email-user.command.js.map