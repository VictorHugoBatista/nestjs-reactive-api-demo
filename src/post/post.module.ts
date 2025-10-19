import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { GetPostReactiveCommand } from './commands/get-post-reactive.command';
import { PostController } from './controllers/post.controller';
import { PostReactiveService } from './services/post-reactive.service';

@Module({
  controllers: [PostController],
  imports: [HttpModule],
  providers: [GetPostReactiveCommand, PostReactiveService],
})
export class PostModule {}
