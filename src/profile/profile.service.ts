import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileRepository } from "./profile.repository";

@Injectable()
export class ProfileService{
    constructor(@InjectRepository(ProfileRepository)private readonly profileRepository : ProfileRepository){}

    public async getUserProfile(id){
        const user = await this.profileRepository.findOne({id})
        if(!user) throw new NotFoundException()
        return user
    }
}