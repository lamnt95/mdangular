import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  async getData() {
    const url = 'https://java-crypto.herokuapp.com/post/getAll';
    return this.http.get(url).toPromise();
  }

  async getAll2() {
    const url = 'https://java-crypto.herokuapp.com/post/getAll2';
    return this.http.get(url).toPromise();
  }

  async getOne(id) {
    const url = 'https://java-crypto.herokuapp.com/post/getOne?id=' + id;
    return this.http.get(url).toPromise();
  }

  async fetch() {
    await this.http
      .get('https://java-crypto.herokuapp.com/post/fetchMessari?limit=10000')
      .toPromise();
  }

  async getCache() {
    await this.http
      .get('https://java-crypto.herokuapp.com/post/getCache')
      .toPromise();
  }

  async setCache() {
    await this.http
      .get('https://java-crypto.herokuapp.com/post/setCache')
      .toPromise();
  }
}
