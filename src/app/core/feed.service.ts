import { FeedParams } from './../shared/models/FeedParams';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Pagination } from '../shared/models/pagination';
import { IPost } from '../shared/models/IPost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private baseUrl: string = environment.apiUrl;

  pagination = new Pagination();
  feedParams = new FeedParams();
  posts: IPost[] = [];

  constructor(private http: HttpClient) {}

  getFeed(): Observable<Pagination> {
    let params = new HttpParams();
    params = params.append('limit', this.feedParams.postsLimit);
    if (this.feedParams.dir) {
      params = params.append(this.feedParams.dir, this.feedParams.dirVal);
    }

    return this.http
      .get<any>(this.baseUrl, { observe: 'response', params })
      .pipe(
        map((response) => {
          const fetchedPosts = response.body.data.children;

          this.posts = fetchedPosts.map(
            (child: any) =>
              ({
                id: child.data.id,
                created: child.data.created,
                num_comments: child.data.num_comments,
                author: child.data.author,
                score: child.data.score,
                title: child.data.title,
                selftext: child.data.selftext,
                thumbnail: child.data.thumbnail,
              } as IPost)
          );

          this.pagination.posts = this.posts;
          this.pagination.before = response.body.data.before;
          this.pagination.after = response.body.data.after;
          return this.pagination;
        })
      );
  }

  getFeedParams(): FeedParams {
    return this.feedParams;
  }

  setFeedParams(params: FeedParams): void {
    this.feedParams = params;
  }
}
