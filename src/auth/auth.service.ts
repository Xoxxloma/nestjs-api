import {HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.model";


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }


    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto)
        return await this.generateToken(user)
    }


    async signup(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email)
        console.log(candidate, "CANDIDATE")
        if (candidate) {
            throw new HttpException('Пользователь с такой почтой уже существует', HttpStatus.BAD_REQUEST)
        } else {
            const hashedPassword = await bcrypt.hash(userDto.password, 5)
            const user = await this.usersService.createUser({...userDto, password: hashedPassword})
            return this.generateToken(user)
        }
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser (userDto: CreateUserDto) {
        const findedUser = await this.usersService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, findedUser.password)
        if (findedUser && passwordEquals) {
            return findedUser;
        }
        throw new UnauthorizedException({message: 'Неправильный логин или пароль' })
    }
}
