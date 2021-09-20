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
  loading: boolean = false;
  before: string = '';
  after: string = '';
  fromStartCounter: number = 0;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.loading = true;
    this.feedService.getFeed().subscribe((response) => {
      if (response.posts.length < 1) {
        this.before = '';
        this.loading = false;
        return;
      }
      this.posts = response.posts;
      this.before = 't3_' + response.posts[0].id;
      this.after = 't3_' + response.posts[response.posts.length - 1].id;
      this.loading = false;
    });
  }

  onPageChange(event: any) {

    const feedParams = this.feedService.getFeedParams();
    if (event.target.value === 'before') {
      feedParams.dir = 'before';
      feedParams.dirVal = this.before;
      this.fromStartCounter--;

    } else {
      feedParams.dir = 'after';
      feedParams.dirVal = this.after;
      this.fromStartCounter++;

    }
    this.feedService.setFeedParams(feedParams);
    this.getPosts();
    window.scroll(0, 0);
    
  }

  onPostAmountChange(event: any) {
    const feedParams = this.feedService.getFeedParams();
    feedParams.postsLimit = event.target.value;
    this.feedService.setFeedParams(feedParams);
    this.getPosts();
    window.scroll(0, 0);
  }
}
