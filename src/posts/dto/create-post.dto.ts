import {ApiProperty} from "@nestjs/swagger";


export class CreatePostDto {
    @ApiProperty({example: "post title", description: 'The title of post'})
    readonly title: string
    @ApiProperty({example: "post description", description: 'The description of post'})
    readonly description: string
    readonly userId: number
}