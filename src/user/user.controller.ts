import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponse } from "@app/user/types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import type { ExpressRequest } from "@app/types/expressRequest.interface";

@Controller('users')
export class UserController{
    
    constructor(private readonly userService: UserService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto
    ): Promise<UserResponse> {
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(
        @Body('user') loginUserDto: LoginUserDto
    ): Promise<UserResponse>{
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('user')
    async currentUser(
        @Req() rq: ExpressRequest
    ): Promise<UserResponse>{
        console.log('current user in controller', rq.user)
        return 'currentUser' as any
    }
}