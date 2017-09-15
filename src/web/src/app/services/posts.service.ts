import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

  dummyApi = environment.dummyApi;

  constructor(private http: Http) {
    console.log('PostsService Initialized...');
  }

  getPosts() {
    return this.http.get(this.dummyApi)
      .map(res => res.json());
  }

  getPost(id) {
    return this.http.get(`${this.dummyApi}/${id}`)
      .map(res => res.json());
  }

}
