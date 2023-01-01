import { Injectable } from "@nestjs/common";
import { UserQuery } from "../queries";

@Injectable()
export class UserDomainService {
    constructor(private userQuery: UserQuery) {}

    async getAllUser() {
        return await this.userQuery.getAll();
    }
}