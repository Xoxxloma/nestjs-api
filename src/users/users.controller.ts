import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/role-auth.decorator";
import {RoleGuard} from "../auth/role.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";


@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Создание нового пользователя'})
    @ApiResponse({ status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post('/new')
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @ApiResponse({ status: 200, type: [User]})
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Выдать роль пользователю'})
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    @ApiResponse({ status: 200 })
    @Post('/role')
    addRole(@Body() addRoleDto: AddRoleDto) {
        return this.usersService.addRole(addRoleDto)
    }


    @ApiOperation({summary: 'Забанить пользователя'})
    @Roles("ADMIN")
    @UseGuards(RoleGuard)
    @ApiResponse({ status: 200 })
    @Post('/banUser')
    banUser(@Body() banUserDto: BanUserDto) {
        return this.usersService.banUser(banUserDto)
    }
}
