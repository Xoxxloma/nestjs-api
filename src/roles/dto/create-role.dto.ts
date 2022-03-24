import {ApiProperty} from "@nestjs/swagger";


export class CreateRoleDto {
    @ApiProperty({example: "ADMIN", description: "role"})
    readonly value: string
    @ApiProperty({example: "super user role", description: "Role description"})
    readonly description: string
}