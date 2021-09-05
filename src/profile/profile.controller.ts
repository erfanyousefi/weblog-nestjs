import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ProfileService } from "./profile.service";

@Controller('/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    @Get()
    @UseGuards(AuthGuard())
    public userProfile(@Req() req){
        const id = req.user.id
        let user = this.profileService.getUserProfile(id)
        user = user.then(user => {
            delete user.token;
            delete user.password;
            return user
        })
        return user
    }
}