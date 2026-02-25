import { UserEntity } from "@app/user/user.entity";
import { User } from "./user.types";

export interface UserResponse {
    user: Omit<User, "password"> & { token: string}
}