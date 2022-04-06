import { Component, VERSION } from '@angular/core';
import { ApiService } from './api.service';

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
