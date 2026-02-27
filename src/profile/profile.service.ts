import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProfileType } from "./type/profile.type";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { Repository } from "typeorm";
import { ProfileResponse } from "./type/profile.response";
import { FollowEntity } from "./follow.entity";

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        
        @InjectRepository(FollowEntity)
        private readonly followRepo: Repository<FollowEntity>
    ){}

    async getProfile(
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

    async followProfile(
        currentUserId: number,
        profileUserName: string
    ): Promise<ProfileType>{
        const user = await this.getProfile(profileUserName)
        if(user.id === currentUserId) throw new HttpException(
            'Follower and Following cant be equal', 
            HttpStatus.FORBIDDEN
        )
        
        const follow = await this.followRepo.findOne({
            where: {
                followerId: currentUserId,
                followindId: user.id
            }
        })
        
        if(follow) throw new HttpException('You already follow this profile', HttpStatus.NOT_FOUND)

        const followToCreate = new FollowEntity()
        followToCreate.followerId = currentUserId
        followToCreate.followindId = user.id
        await this.followRepo.save(followToCreate)

        return {...user, following: true }

    }


    builProfileResponse(
        profile: ProfileType
    ): ProfileResponse{
        return {
            profile
        }
    }
}