import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/models/IPost';

@Component({
  selector: 'app-feed-teaser',
  templateUrl: './feed-teaser.component.html',
  styleUrls: ['./feed-teaser.component.scss']
})
export class FeedTeaserComponent implements OnInit {
  @Input() post!: IPost;
  constructor() { }

  ngOnInit(): void {
  }

  cachePost(post:IPost) {
    localStorage.setItem('post', JSON.stringify(post));
  }

}
