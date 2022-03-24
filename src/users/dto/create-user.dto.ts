import {ApiProperty} from "@nestjs/swagger";
import {IS_EMAIL, IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsEmail({}, {message: 'Некорректный email'})
    @IsString({ message: 'Поле должно быть строкой'})
    @ApiProperty({example: "pepega@mail.ru", description: "User's email"})
    readonly email: string;
    @IsString({ message: 'Поле должно быть строкой'})
    @Length(4, 16, {message: 'Длина от 4 до 16 символов'})
    @ApiProperty({example: "password", description: "User's password"})
    readonly password: string;
}