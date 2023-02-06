import { Request, Response } from 'express';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserDeltail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
