import { Controller, Get, Post, Param, UseGuards } from "@nestjs/common";
import { User } from "@app/user/decorators/user.decorator";
import { ProfileResponse } from "./type/profile.response";
import { ProfileService } from "./profile.service";
import { FollowEntity } from "./follow.entity";
import { AuthGuard } from "@app/user/guards/auth.guard";
import { profile } from "console";

@Controller('profiles')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ){}

    @Get(':username')
    async getProfile(
        @Param('username') profileUsername: string
    ): Promise<ProfileResponse>{
        const profile = await this.profileService.getProfile(
            profileUsername
        )
        return this.profileService.builProfileResponse(profile)
    }

    @Post(':username/follow')
    @UseGuards(AuthGuard)
    async follow(
        @User('id') currentUserId: number,
        @Param('username') username: string
    ): Promise<ProfileResponse>{
        const follow = await this.profileService.followProfile(
            currentUserId, 
            username
        )
        return this.profileService.builProfileResponse(follow)
    }
}