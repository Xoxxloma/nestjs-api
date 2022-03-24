import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@ApiTags("Authorization")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post(`/login`)
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Post(`/signup`)
    signup(@Body() dto: CreateUserDto) {
        return this.authService.signup(dto);
    }
}
