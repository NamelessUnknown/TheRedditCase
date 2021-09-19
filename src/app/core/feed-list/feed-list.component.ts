import { FeedParams } from './../../shared/models/FeedParams';
import { FeedService } from './../feed.service';
import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/models/IPost';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit {
  posts: IPost[] = [];
  before: string = '';
  after: string = '';

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.feedService.getFeed().subscribe((response) => {
      this.posts = response.posts;
      this.before = 't3_' + response.posts[0].id;
      this.after = 't3_' + response.posts[response.posts.length - 1].id;
    });
  }

  onPageChange(e: any) {
    console.log(e.target.value);
    const feedParams = this.feedService.getFeedParams();
    if (e.target.value === 'before') {
      feedParams.dir = 'before';
      feedParams.dirVal = this.before;
    } else {
      feedParams.dir = 'after';
      feedParams.dirVal = this.after;
    }
    this.feedService.setFeedParams(feedParams);
    this.getPosts();
  }

  onPostAmountChange(e:any) {
    console.log(e.target.value);
    const feedParams = this.feedService.getFeedParams();
    feedParams.postsLimit = e.target.value;
    console.log(feedParams.postsLimit)
    this.feedService.setFeedParams(feedParams);
    this.getPosts();
  }
}
