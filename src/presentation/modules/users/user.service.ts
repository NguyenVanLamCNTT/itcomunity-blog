import { Injectable } from "@nestjs/common";
import { UserDomainService } from "src/domain/services";

@Injectable({})
export class UserService {

    constructor(private userDomainService: UserDomainService) { } 

    async getAllUser() {
        return await this.userDomainService.getAllUser();
    }
}