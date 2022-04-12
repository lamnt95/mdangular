import { Component, OnInit, VERSION } from '@angular/core';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { keys, admins } from './user';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  res: any;
  key: any;
  loading: any = false;
  fetching: any = false;
  selected: any = { markdown: '' };
  val: any = '23123123';
  hide: any = false;
  loadper: any = 0;
  isValid: any = false;
  constructor(private apiService: ApiService) {
    // this.load();
  }
  ngOnInit(): void {
    this.load();
    setInterval(() => {
      this.isValid = false;
    }, 600000);
  }

  async getCache() {
    const a = await this.apiService.getCache();
    console.log(a);
  }

  async setCache() {
    const a = await this.apiService.setCache();
    console.log(a);
  }

  async fetch() {
    this.loading = true;
    const a = await this.apiService.fetch();
    this.loading = false;
  }

  async load() {
    this.loading = true;
    const a = await this.apiService.getAll2();
    console.log('getAll2', a);
    const b = _.map(a, (it: any) => {
      const dt = new Date(it.d * 1000);
      const month = dt.getMonth() + 1;
      const year = dt.getFullYear();
      it.updateDateStr = dt.getDate() + '-' + month + '-' + year;

      // it.name = it.updateDateStr + ' ' + it.name;
      return it;
    });

    const c = _.sortBy(b, ['updateDate']);
    this.res = _.reverse(c);

    this.loading = false;
  }

  async choose(resit) {
    this.loading = true;
    console.log('resit', resit);
    const a = await this.apiService.getOne(resit.i);
    this.selected = a;
    this.loading = false;

    console.log(a);
  }

  clhide() {
    this.hide = !this.hide;
  }

  checkKey() {
    if (_.includes(keys, this.key) || _.includes(admins, this.key)) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  isAdmins() {
    return _.includes(admins, this.key);
  }
}
