import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {RolesService} from "./roles.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";


@ApiTags("Roles")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {
    }

    @ApiOperation({summary: 'Создание новой роли'})
    @ApiResponse({ status: 200, type: Role})
    @Post('/new')
    createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
        return this.roleService.createRole(roleDto);
    }

    @ApiOperation({summary: 'Получение роли по параметру'})
    @ApiResponse({ status: 200, type: Role })
    @Get("/:value")
    getRoleByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
