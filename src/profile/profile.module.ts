import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controler";
import { ProfileService } from "./profile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { FollowEntity } from "./follow.entity";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])]
})
export class ProfileModule{}