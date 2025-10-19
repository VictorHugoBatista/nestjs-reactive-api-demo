import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { GetPostReactiveCommand } from '../commands/get-post-reactive.command';
import { GetPostSyncCommand } from '../commands/get-post-sync.command';

@Controller('post')
export class PostController {
  constructor(
    private reactiveCommand: GetPostReactiveCommand,
    private syncCommand: GetPostSyncCommand,
  ) {}

  @Get('/:postId/reactive')
  @ApiOperation({
    summary:
      'Call the post and comments endpoints at the same time and merges with RXJS',
  })
  public getReactive(@Param('postId') postId: number) {
    return this.reactiveCommand.execute(postId);
  }

  @Get('/:postId/sync')
  @ApiOperation({
    summary:
      'Call the post and comments endpoints one by time, merging and return synchronously',
  })
  public async getSync(@Param('postId') postId: number) {
    return await this.syncCommand.execute(postId);
  }
}
