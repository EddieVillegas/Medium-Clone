import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileType } from "./type/profile.type";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { Repository } from "typeorm";
import { ProfileResponse } from "./type/profile.response";

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ){}

    async getProfile(
        currentUserId: number,
        profileUserName: string
    ): Promise<ProfileType> {
        const user = await this.userRepo.findOne({
            where: {
                username: profileUserName
            }
        })

        if(!user) {
            throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND)
        }
        
        return { ...user, following: false }
    }

    builProfileResponse(profile: ProfileType): ProfileResponse{
        return {
            profile
        }
    }
}