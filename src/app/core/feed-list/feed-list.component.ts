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
      this.before = response.before;
      this.after = response.after;
    });
  }

  onFeedSizeChange(size: number) {
    const feedParams = this.feedService.getFeedParams();
    feedParams.pageNumber = size;
    this.feedService.setFeedParams(feedParams);
    this.getPosts();
  }

  onBeforePageChange() {
    const feedParams = this.feedService.getFeedParams();
    feedParams.before = this.before;
    this.feedService.setFeedParams(feedParams);

    this.getPosts();
  }

  onAfterPageChange() {
    const feedParams = this.feedService.getFeedParams();
    feedParams.after = this.after;
    this.feedService.setFeedParams(feedParams);

    this.getPosts();
  }
}
