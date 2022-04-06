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

  constructor(private apiService: ApiService) {}

  async load() {
    const res = await this.apiService.getData();
    console.log(res);
  }
}
