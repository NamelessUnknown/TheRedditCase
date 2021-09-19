import { NgxLoadingModule } from 'ngx-loading';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedDetailsComponent } from './feed-details/feed-details.component';
import { FeedTeaserComponent } from './feed-teaser/feed-teaser.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    FeedListComponent,
    FeedDetailsComponent,
    FeedTeaserComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgxLoadingModule.forRoot({}),
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    FeedListComponent,
    FeedDetailsComponent,
  ],
})
export class CoreModule {}
