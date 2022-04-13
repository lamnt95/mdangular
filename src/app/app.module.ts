import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { NgxLoadingModule } from 'ngx-loading';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    MarkdownModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    NgxBootstrapMultiselectModule,
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
