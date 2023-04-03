import { Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(
        private postService : PostsService
    ){}

    @Get('getAll')
    async getAll() {
      return await this.postService.getAll();
    }

    @Post('create')
    async createPost(){
        return await this.postService.createPost();
    }
}
