import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags("Roles")
@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}


    @Post('/new')
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() createPostDto: CreatePostDto, @UploadedFile() image) {
        return this.postService.createPost(createPostDto, image)
    }
}
