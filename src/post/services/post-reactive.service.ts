import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Comment } from '../interfaces/comment';
import { Post } from '../interfaces/post';

@Injectable()
export class PostReactiveService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';
  constructor(private readonly httpService: HttpService) {}

  public getPostDetail(id: number): Observable<AxiosResponse<Post>> {
    return this.httpService.get(`${this.baseUrl}/posts/${id}`);
  }

  public getPostComents(id: number): Observable<AxiosResponse<Comment[]>> {
    return this.httpService.get(`${this.baseUrl}/posts/${id}/comments`);
  }
}
