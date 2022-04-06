import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getData() {
    const url = 'https://java-crypto.herokuapp.com/post/getAll';
    return this.http.get(url).toPromise();
  }
}
