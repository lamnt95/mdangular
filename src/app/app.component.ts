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
    const timepout = setInterval(() => {
      this.loadper = this.loadper + 3;
    }, 1000);
    const a = await this.apiService.fetch();
    this.loadper = 0;
    clearInterval(timepout);
    this.loading = false;
  }

  async load() {
    this.loading = true;
    const timepout = setInterval(() => {
      this.loadper = this.loadper + 1;
    }, 1000);
    const a = await this.apiService.getData();
    this.loadper = 0;
    clearInterval(timepout);
    const b = _.map(a, (it: any) => {
      it.updateDate = new Date(it.date * 1000);
      const month = it.updateDate.getMonth() + 1;
      const year = it.updateDate.getFullYear();
      it.updateDateStr = it.updateDate.getDate() + '-' + month + '-' + year;

      // it.name = it.updateDateStr + ' ' + it.name;
      return it;
    });

    const c = _.sortBy(b, ['updateDate']);
    this.res = _.reverse(c);

    this.loading = false;
  }

  choose(resit) {
    this.selected = resit;
    console.log(resit);
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
