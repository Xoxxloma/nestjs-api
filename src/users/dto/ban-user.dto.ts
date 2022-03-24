import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({example: "1", description: "User id"})
    readonly userId: string;
    @ApiProperty({example: "Spam", description: "Ban reason"})
    readonly banReason: string;
}