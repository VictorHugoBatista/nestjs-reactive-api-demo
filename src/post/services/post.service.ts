import { AxiosResponse } from 'axios';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Comment } from '../interfaces/comment';
import { Post } from '../interfaces/post';

@Injectable()
export class PostService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';
  constructor(private readonly httpService: HttpService) {}

  public getComplete(id: number) {
    const postDetailObservable$ = this.getPostDetail(id);
    const postComentsObservable$ = this.getPostComents(id).pipe(
      map((comments) => {
        return comments;
      }),
    );
    const postCompleteObservable$ = combineLatest({
      postDetailObservable$,
      postComentsObservable$,
    });

    return postCompleteObservable$;
  }

  public getPostDetail(id: number): Observable<AxiosResponse<Post>> {
    return this.httpService.get(`${this.baseUrl}/posts/${id}`);
  }

  public getPostComents(id: number): Observable<AxiosResponse<Comment[]>> {
    return this.httpService.get(`${this.baseUrl}/posts/${id}/comments`);
  }
}
