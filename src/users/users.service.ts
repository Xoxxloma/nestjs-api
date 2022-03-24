import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";
import {BanUserDto} from "./dto/ban-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}


    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("ADMIN")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll({include: Role});
    }


    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}, include: {all: true}});
    }

    async addRole(addRoleDto: AddRoleDto) {
        const user = await this.userRepository.findByPk(addRoleDto.userId)
        const role = await this.roleService.getRoleByValue(addRoleDto.value)
        if (user && role) {
            await user.$add('role', role.id)
            return addRoleDto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async banUser(banUserDto: BanUserDto) {
        const user = await this.userRepository.findByPk(banUserDto.userId)
        if (user) {
            user.banned = true;
            user.banReason = banUserDto.banReason
            await user.save()
            return user;
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
}
