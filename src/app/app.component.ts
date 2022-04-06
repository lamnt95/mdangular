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
  constructor(private apiService: ApiService) {}

  async load() {
    this.loading = true;
    const res = await this.apiService.getData();
    this.loading = false;
    console.log(res);
  }
}
