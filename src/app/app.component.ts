import { Component, VERSION } from '@angular/core';
import { ApiService } from './api.service';
import * as _ from 'lodash';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  res: any;
  loading: any = false;
  selected: any = { markdown: '' };
  val: any = '23123123';
  hide: any = false;
  constructor(private apiService: ApiService) {
    // this.load();
  }

  async load() {
    this.loading = true;
    this.res = await this.apiService.getData();
    this.res = this.res.sort(function (a, b) {
      return a - b;
    });
    this.res = _.map(this.res, (it: any) => {
      const dt = new Date(_.toNumber(it.date) * 1000);
      const mth = dt.getMonth() + 1;
      it.day = dt.getDate() + '-' + mth + '-' + dt.getFullYear();
      it.name = it.day + ' ' + it.name;
      return it;
    });
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
