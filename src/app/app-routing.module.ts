import { FeedListComponent } from './core/feed-list/feed-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedDetailsComponent } from './core/feed-details/feed-details.component';

const routes: Routes = [
  { path: '', component: FeedListComponent },
  { path: 'posts/:id', component: FeedDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
