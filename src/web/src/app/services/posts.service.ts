import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  endpoint = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: Http) {
    console.log('PostsService Initialized...');
  }

  getPosts() {
    return this.http.get(this.endpoint)
      .map(res => res.json());
  }

  getPost(id) {
    return this.http.get(`${this.endpoint}/${id}`)
      .map(res => res.json());
  }

}
