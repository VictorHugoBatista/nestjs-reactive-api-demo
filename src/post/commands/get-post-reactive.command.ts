import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';

import { PostReactiveService } from '../services/post-reactive.service';

@Injectable()
export class GetPostReactiveCommand {
  constructor(private postService: PostReactiveService) {}

  execute(postId: number) {
    const postDetailObservable$ = this.postService.getPostDetail(postId);
    const postComentsObservable$ = this.postService.getPostComents(postId).pipe(
      map((comments) => {
        return comments;
      }),
    );

    const postCompleteObservable$ = combineLatest({
      postDetailObservable$,
      postComentsObservable$,
    });

    return postCompleteObservable$.pipe(
      map((postComplete) => {
        return {
          ...postComplete.postDetailObservable$.data,
          comments: postComplete.postComentsObservable$.data,
        };
      }),
    );
  }
}
