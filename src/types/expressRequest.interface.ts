import { UserEntity } from "@app/user/user.entity";
import type { Request } from "express";

export interface ExpressRequest extends Request {
    user?: UserEntity | null
}