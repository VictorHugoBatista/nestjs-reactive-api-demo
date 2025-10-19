import { map } from 'rxjs/operators';
import { Controller, Get, Param } from '@nestjs/common';

import { PostService } from '../services/post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/:id')
  public get(@Param('id') id: number) {
    const postObservable$ = this.postService.getComplete(id);

    return postObservable$.pipe(
      map((postComplete) => {
        return {
          ...postComplete.postDetailObservable$.data,
          comments: postComplete.postComentsObservable$.data,
        };
      }),
    );
  }
}
