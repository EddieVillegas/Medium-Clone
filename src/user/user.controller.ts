import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponse } from "@app/user/types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UserEntity } from "./user.entity";
import { User } from "./decorators/user.decorator";
import { AuthGuard } from "./guards/auth.guard";

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
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UserEntity): Promise<UserResponse|null> {
        return this.userService.buildUserResponse(user)
        
    }
}