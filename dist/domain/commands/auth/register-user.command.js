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
exports.RegisterUserCommand = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../enums");
const exceptions_1 = require("../../exceptions");
const models_1 = require("../../models");
const entities_1 = require("../../../infrastructure/database/entities");
const repositories_1 = require("../../../infrastructure/database/repositories");
let RegisterUserCommand = class RegisterUserCommand {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        if (this.isGenderInvalid(input.gender)) {
            throw new exceptions_1.GenderNotExistException();
        }
        const user = await this.userRepository.findByEmail(input.email);
        if (user) {
            throw new exceptions_1.EmailExistException();
        }
        const entity = new entities_1.UserEntity(input);
        await this.userRepository.save(entity);
        return new models_1.RegisterUserCommandResultModel({ success: true });
    }
    isGenderInvalid(gender) {
        const value = enums_1.Gender[gender];
        return !value;
    }
};
RegisterUserCommand = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], RegisterUserCommand);
exports.RegisterUserCommand = RegisterUserCommand;
//# sourceMappingURL=register-user.command.js.map