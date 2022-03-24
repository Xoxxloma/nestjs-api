import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @IsNumber({}, {message: 'userId должен быть числом'})
    @ApiProperty({example: "1", description: "User id"})
    readonly userId: number;
    @IsString({message: 'Роль должна быть строкой'})
    @ApiProperty({example: "ADMIN", description: "Role name"})
    readonly value: string;
}