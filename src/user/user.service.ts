import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken"
import { JWT_SECRET } from "@app/config/config";
import { UserResponse } from "@app/user/types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { compare } from "bcrypt";
import { find } from "rxjs";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ){}

    async createUser(createUserDto: CreateUserDto){
        const userByEmail = await this.userRepo.findOne({
            where: {
                email: createUserDto.email
            }
        })
        const userByUsername = await this.userRepo.findOne({
            where: {
                username: createUserDto.username
            }
        })
        if(userByEmail || userByUsername) {
            throw new HttpException(
                'Email or username are taken', 
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        return await this.userRepo.save(newUser)
    }

    async findById(
        id:number
    ): Promise<UserEntity|null> {
        return await this.userRepo.findOne({
            where: {
                id
            }
        })
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const findedUser = await this.userRepo.findOne({
            where: {
                email: loginUserDto.email
            },
            select: ['id', "username", "email", "bio", "image", "password"]
        })
        if(!findedUser) throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY)
        const isPasswordCorrect = await compare(loginUserDto.password, findedUser.password)
        if(!isPasswordCorrect) 
            throw new HttpException(
                'Bad password or email',
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        return findedUser
    }

    private generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            email: user.email,
            username: user.username
        }, JWT_SECRET)
    }

    buildUserResponse(user: UserEntity): UserResponse {
        const {password, ...res} = user
        return {
            user: {
                ...res,
                token: this.generateJwt(user)
            }
        }
    }
}