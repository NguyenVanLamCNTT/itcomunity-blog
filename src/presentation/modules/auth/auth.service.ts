import { Injectable } from "@nestjs/common";
import { UserDomainService } from "src/domain/services";
import { JwtUtil } from "src/infrastructure/utilities";
import { RegisterUserRequestModel, RegisterUserResponseModel, ResponseModel } from "src/presentation/models";
import { RequestCorrelation } from "src/utility";

@Injectable({})
export class AuthService {

    constructor(private jwtUtil: JwtUtil, private userDomainService: UserDomainService) { }

    async register(request: RegisterUserRequestModel) {
        const password = await this.jwtUtil.generatePassword(request.password);
        const result = await this.userDomainService.createUser({
            age: request.age,
            email: request.email,
            fullName: request.fullName,
            gender: request.gender,
            password: password,
            username: request.username
        });
        return new RegisterUserResponseModel({
            id: RequestCorrelation.getRequestId(),
            data: {success: result}
        });
    }
}