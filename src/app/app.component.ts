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
    this.res = _.sortBy(this.res, 'date');
    this.res = _.map(this.res, (it: any) => {
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
