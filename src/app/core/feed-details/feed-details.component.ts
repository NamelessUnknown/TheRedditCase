import { FeedService } from './../feed.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/models/IPost';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss'],
})
export class FeedDetailsComponent implements OnInit {
  post!: IPost;
  constructor(private feedService: FeedService, private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    //this.post = history.state; - works, but 1st time: after refreshing, post is no longer available
    const storedPost = localStorage.getItem('post')
    if (storedPost != null) {
      this.post = JSON.parse(storedPost);
    }
  }

}
