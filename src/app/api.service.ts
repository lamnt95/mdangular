import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  // url2: any = 'https://java-crypto.herokuapp.com/';
  url2: any = 'http://localhost:7000/';
  async getData() {
    const url = `${this.url2}post/getAll`;
    return this.http.get(url).toPromise();
  }

  async getAllCate() {
    const url = `${this.url2}post/getAllCate`;
    return this.http.get(url).toPromise();
  }

  async getAll2() {
    const url = `${this.url2}post/getAll2`;
    return this.http.get(url).toPromise();
  }

  async getOne(id) {
    const url = `${this.url2}post/getOne?id=` + id;
    return this.http.get(url).toPromise();
  }

  async fetch() {
    await this.http
      .get(`${this.url2}post/fetchMessari?limit=10000`)
      .toPromise();
  }

  async getCache() {
    await this.http.get(`${this.url2}post/getCache`).toPromise();
  }

  async setCache() {
    await this.http.get(`${this.url2}post/setCache`).toPromise();
  }

  async create(req) {
    return this.http.post(`${this.url2}post/create`, req).toPromise();
  }

  async update(req) {
    return this.http.put(`${this.url2}post/update`, req).toPromise();
  }
}
