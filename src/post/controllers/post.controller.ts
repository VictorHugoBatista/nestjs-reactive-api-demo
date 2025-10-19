import { Controller, Get, Param } from '@nestjs/common';

import { GetPostReactiveCommand } from '../commands/get-post-reactive.command';

@Controller('post')
export class PostController {
  constructor(private reactiveCommand: GetPostReactiveCommand) {}

  @Get('/:postId/reactive')
  public get(@Param('postId') postId: number) {
    return this.reactiveCommand.execute(postId);
  }
}
