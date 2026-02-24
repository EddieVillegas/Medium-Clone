import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import {sign} from "jsonwebtoken"
import { JWT_SECRET } from "@app/config/config";
import { UserResponse } from "@app/types/userResponse.interface";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ){}

    async createUser(createUserDto: CreateUserDto){
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        return await this.userRepo.save(newUser)
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email,
            username: user.username
        }, JWT_SECRET)
    }

    buildUserResponse(user: UserEntity): UserResponse {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}