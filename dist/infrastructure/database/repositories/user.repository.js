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
exports.UserRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let UserRepository = class UserRepository {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async save(user) {
        await this.usersRepository.save(user);
    }
    async findByEmail(email) {
        return await this.usersRepository.findOne({ where: { email } });
    }
    async findByEmailOrUsername(textSearch) {
        return await this.usersRepository.findOne({
            where: [{ email: textSearch }, { username: textSearch }],
        });
    }
};
UserRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map