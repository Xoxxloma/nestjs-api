import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface PostCreationAttribute {
    title: string;
    description: string;
    image: string
    userId: number;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttribute> {
    @ApiProperty({example: "post title", description: 'The title of post'})
    @Column({type: DataType.STRING})
    private title: string;

    @ApiProperty({example: "post description", description: 'The description of post'})
    @Column({type: DataType.STRING})
    private description: string;

    @ApiProperty({example: "image", description: 'Some picture'})
    @Column({type: DataType.STRING})
    private image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User
}