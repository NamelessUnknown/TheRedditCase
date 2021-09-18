import { FeedParams } from './../shared/models/FeedParams';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Pagination } from '../shared/models/pagination';
import { IPost } from '../shared/models/IPost';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  baseUrl: string = environment.apiUrl;
  pagination = new Pagination();
  feedParams = new FeedParams();
  posts: IPost[] = [];

  constructor(private http: HttpClient) {}

  getFeed() {
     let params = new HttpParams();
     console.log(this.feedParams)
     params = params.append('limit', this.feedParams.postsLimit)
     if(this.feedParams.after.length > 0)
     {
       params = params.append('after', this.feedParams.after)
     }
      if (this.feedParams.before.length > 0) {
        params = params.append('before', this.feedParams.before);
      }

    return this.http.get<any>(this.baseUrl, { observe: 'response', params }).pipe(
      map((response) => {
        console.log(response.body.data.children)
        const fetchedPosts = response.body.data.children;
        this.posts = fetchedPosts.slice(0, this.feedParams.postsLimit).map(
          (child: any) =>
            ({
              id: child.data.id,
              created: child.data.created,
              num_comments: child.data.num_comments,
              author: child.data.author,
              score: child.data.score,
              title: child.data.title,
              selftext: child.data.selftext,
            } as IPost)
        );
        if(response.body.data.before != null)
        {
          this.pagination.before = response.body.data.before
        }
        else
        {
          this.pagination.after = response.body.data.after;
        }

        this.pagination.posts = this.posts;
        console.log(this.pagination)
        return this.pagination;
      })
    );
  }

  getFeedParams(): FeedParams {
    return this.feedParams;
  }

  setFeedParams(params: FeedParams) {
    this.feedParams = params;
  }

  findIndex() {
    
  }

  // getFeed() {
  //   return this.http.get<any>(this.baseUrl, { observe: 'response' }).pipe(
  //     map((response) => {
  //       this.posts = [...this.posts, response.body.data];
  //     })
  //   );

  //   // return this.http.get<any>(this.baseUrl).subscribe(res => {
  //   //   console.log('PRZED OBRÓBOM: ', res.data.children[0].data.created);

  //   //   let siema = res.data.children.map(
  //   //     (feed: any) =>
  //   //       ({
  //   //         id: feed.id,
  //   //         created: feed.created,
  //   //         num_comments: feed.num_comments,
  //   //         author: feed.author,
  //   //         score: feed.score,
  //   //         title: feed.title,
  //   //         selftext: feed.selftext,
  //   //       } as IFeed)
  //   //   );
  //   //   console.log('DUPSKO: ', siema);

  //   //   console.log('FEEDY: ', this.feed)
  //   // })
  // }
}
