import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

import { PostReactiveService } from '../services/post-reactive.service';

@Injectable()
export class GetPostSyncCommand {
  constructor(private postService: PostReactiveService) {}

  public async execute(postId: number) {
    const postDetailObservable$ = this.postService.getPostDetail(postId);
    const post = await lastValueFrom(postDetailObservable$);
    const postComentsObservable$ = this.postService.getPostComents(postId);
    const comments = await lastValueFrom(postComentsObservable$);

    return {
      ...post.data,
      comments: comments.data,
    };
  }
}
