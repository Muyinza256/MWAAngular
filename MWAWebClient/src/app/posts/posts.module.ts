import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCommentComponent } from './post-comment/post-comment.component';


@NgModule({
  declarations: [PostsComponent, PostDetailComponent, PostCommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule
  ],exports:[
    PostDetailComponent
  ]
})
export class PostsModule { }
