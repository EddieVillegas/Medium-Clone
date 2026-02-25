import { JWT_SECRET } from "@app/config/config";
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import type {Response, NextFunction} from "express"
import { verify } from "jsonwebtoken";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService){}

    async use(rq: ExpressRequest, _: Response, next: NextFunction){
        if(!rq.headers.authorization) {
            rq.user = null
            next()
            return
        }

        const [,token] = rq.headers.authorization.split(' ')

        try {
            const decode = verify(token, JWT_SECRET)
            if(typeof decode !== 'string'){
                const user = await this.userService.findById(decode.id)
                rq.user = user
            }
            next()
        } catch (error) {
            rq.user = null
            next()
        }
    }
}