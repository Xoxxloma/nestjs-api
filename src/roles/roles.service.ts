import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async createRole(roleDto: CreateRoleDto): Promise<Role> {
        return await this.roleRepository.create(roleDto)
    }

    async getRoleByValue(value: string) {
        return await this.roleRepository.findOne({where: {value}})
    }

}
