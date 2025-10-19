import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';

@Module({
  controllers: [PostController],
  imports: [HttpModule],
  providers: [PostService],
})
export class PostModule {}
