import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/models/IPost';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss'],
})
export class FeedDetailsComponent implements OnInit {
  @Input() post!: IPost;
  constructor() {}

  ngOnInit(): void {}
}
