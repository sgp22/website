import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../app.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostsService]
})
export class PostComponent implements OnInit {
  public post: Post;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const id = params['id'];
      this.postsService.getPost(id)
        .subscribe(
          post => {
            this.post = post;
          },
          err => {
            console.log(err);
          }
        );
    });
  }

}
