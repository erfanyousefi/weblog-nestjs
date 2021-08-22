import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./auth.repository";
import { LoginUserDTO } from "./dto/login-user.dto";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { AccessToken } from "./token.interface";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { Payload } from "./auth.payload";
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }
    async signup(registerUserDto: RegisterUserDTO): Promise<object> {
        const result = await this.userRepository.createUser(registerUserDto);
        return result;
    }
    async signin(loginUserDto: LoginUserDTO): Promise<AccessToken> {
        let { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ email });
        const payload: Payload = { email: user.email }
        if (user && bcrypt.compareSync(password, user.password)) {
            let accessToken = await this.jwtService.sign(payload)
            user.token = accessToken
            const response = await this.userRepository.save(user).then(user => {
                return {accessToken : user.token}
            }).catch(error => {
                throw new UnauthorizedException("we don't signup you. please trining again")
            })
            return response
        } else {
            throw new UnauthorizedException('Email or password is not true, please trining  again')
        }
    }
}