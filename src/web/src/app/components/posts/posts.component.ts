import { Component, OnInit } from '@angular/core';
import { Post } from '../../app.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostsService]
})
export class PostsComponent implements OnInit {
  posts: Post[];
  loading: boolean;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.postsService.getPosts()
      .subscribe(
        posts => {
          this.loading = false;
          this.posts = posts;
        },
        err => {
          console.log(err);
        }
    )
  }

}