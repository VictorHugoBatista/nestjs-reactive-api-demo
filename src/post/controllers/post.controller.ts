import { Controller, Get, Param } from '@nestjs/common';

import { GetPostReactiveCommand } from '../commands/get-post-reactive.command';
import { GetPostSyncCommand } from '../commands/get-post-sync.command';

@Controller('post')
export class PostController {
  constructor(
    private reactiveCommand: GetPostReactiveCommand,
    private syncCommand: GetPostSyncCommand,
  ) {}

  @Get('/:postId/reactive')
  public getReactive(@Param('postId') postId: number) {
    return this.reactiveCommand.execute(postId);
  }

  @Get('/:postId/sync')
  public getSync(@Param('postId') postId: number) {
    return this.syncCommand.execute(postId);
  }
}
