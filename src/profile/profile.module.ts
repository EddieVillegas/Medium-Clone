import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controler";
import { ProfileService } from "./profile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class ProfileModule{}