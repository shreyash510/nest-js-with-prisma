import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {

    constructor(
        private prismaService: PrismaService
    ) { }

    async getAll() {
        return await this.prismaService.post.findMany();
    }

    async createPost(){
        try{
            const post = await this.prismaService.post.create({
                data : {
                    authorId : 1,
                    title : 'this is tiel',
                    content : 'this is content'
                }
            })
            return post
        }catch(e){
            console.log(e);
        }
    }
}
