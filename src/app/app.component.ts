import { Component, OnInit, VERSION } from '@angular/core';
import { ApiService } from './api.service';
import * as _ from 'lodash';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  res: any;
  loading: any = false;
  fetching: any = false;
  selected: any = { markdown: '' };
  val: any = '23123123';
  hide: any = false;
  constructor(private apiService: ApiService) {
    // this.load();
  }
  ngOnInit(): void {
    this.load();
  }

  async fetch() {
    this.fetching = true;
    this.fetching = false;
  }

  async load() {
    this.loading = true;
    const a = await this.apiService.getData();
    const b = _.map(a, (it: any) => {
      it.updateDate = new Date(it.date * 1000);
      const month = it.updateDate.getMonth() + 1;
      const year = it.updateDate.getFullYear();
      it.updateDateStr = it.updateDate.getDate() + '-' + month + '-' + year;

      it.name = it.updateDateStr + ' ' + it.name;
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
}
