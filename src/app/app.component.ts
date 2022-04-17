import { Component, OnInit, VERSION } from '@angular/core';
import { ApiService } from './api.service';
import * as _ from 'lodash';
import { keys, admins } from './user';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { v4 as uuidv4 } from 'uuid';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
})
export class AppComponent implements OnInit {
  public Editor = ClassicEditor;

  name = 'Angular ' + VERSION.major;
  res: any;
  res2: any;
  key: any;
  loading: any = false;
  fetching: any = false;
  selected: any = {};
  val: any = '23123123';
  hide: any = false;
  loadper: any = 0;
  isValid: any = false;
  cates2: any = [];

  constructor(private apiService: ApiService) {
    // this.load();
  }
  cates: any = ['Messari', 'MessariPro', 'Manual'];

  optionsModel: number[];
  myOptions: IMultiSelectOption[];

  ngOnInit(): void {
    this.myOptions = [
      { id: 'avax', name: 'avax' },
      { id: 'sol', name: 'sol' },
      { id: 'near', name: 'near' },
      { id: 'ftm', name: 'ftm' },
      { id: 'polygon', name: 'polygon' },
      { id: 'eth', name: 'eth' },
      { id: 'bnb', name: 'bnb' },
      { id: 'atom', name: 'atom' },
      { id: 'cro', name: 'cro' },
      { id: 'layer2', name: 'layer2' },
    ];

    this.load();
    setInterval(() => {
      this.isValid = false;
    }, 600000);

    this.apiService
      .getAllCate()
      .then((r: any) => {
        this.cates2 = _.map(r, (i) => {
          i.id = i.name;
          return i;
        });
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChange() {
    console.log(this.optionsModel);
  }

  onChangeCreate() {
    console.log(this.modelCreate);
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

  async load(isUpdateReq: any = null) {
    this.loading = true;
    const a = await this.apiService.getAll2();
    const b = _.map(a, (it: any) => {
      it.udt = new Date(it.d * 1000);
      const month = it.udt.getMonth() + 1;
      const year = it.udt.getFullYear();
      it.updateDateStr = it.udt.getDate() + '-' + month + '-' + year;
      if (it.a == '1') {
        it.a = 'PRO';
      } else if (it.s == 'manual') {
        it.a = 'ME';
      } else {
        it.a = '';
      }
      // it.name = it.updateDateStr + ' ' + it.name;
      return it;
    });

    const c = _.sortBy(b, ['udt']);
    this.res = _.reverse(c);
    this.res2 = this.res;

    if (isUpdateReq == null) {
      const id = _.get(this.res2, '0.i');
      const ait = await this.apiService.getOne(id);
      this.selected = ait;

      if (_.size(this.selected.cateStr) > 0) {
        this.selected.cateStr = JSON.parse(this.selected.cateStr);
      }

      if (this.selected.docType == 'html') {
        this.selected.dateStr = this.toStrDate2(this.selected.date);
      }
    } else {
      const ait = await this.apiService.getOne(isUpdateReq.id);
      this.selected = ait;
      if (this.selected.docType == 'html') {
        this.selected.dateStr = this.toStrDate2(this.selected.date);
      }
    }

    this.loading = false;
  }

  async choose(resit) {
    this.loading = true;
    const a = await this.apiService.getOne(resit.i);
    this.selected = a;
    if (this.selected.docType == 'html') {
      this.selected.dateStr = this.toStrDate2(this.selected.date);
    }
    this.loading = false;
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

  cateActive: any = 'All';

  changeOptions(e) {
    this.loading = false;
    const val = _.get(e, 'target.value');
    switch (val) {
      case 'All':
        this.res2 = this.res;
        break;
      case 'Messari':
        this.selected = {};
        this.res2 = _.filter(this.res, (it: any = {}) => it.s == 'messari');
        break;
      case 'Manual':
        this.selected = {};
        this.res2 = _.filter(this.res, (it: any = {}) => it.s == 'manual');
        break;
      default:
        break;
    }
    this.loading = false;
  }

  isCreate: any = false;
  isShowDefault() {
    return _.isEmpty(this.selected) && !this.isCreate;
  }
  isShowCreate() {
    return !this.isCreate;
  }

  isEdit: any = false;
  isShowEdit() {
    return !_.isEmpty(this.selected) && !this.isEdit;
  }

  isShowSave() {
    return !_.isEmpty(this.selected) && this.isEdit;
  }

  isShowBack() {
    return !_.isEmpty(this.selected) || this.isCreate;
  }

  isShowPreview() {
    return (
      !_.isEmpty(this.selected) &&
      !this.isCreate &&
      this.selected.docType == null
    );
  }

  isShowCkeditor() {
    return this.isCreate;
  }

  isShowCkeditorEdit() {
    return !_.isEmpty(this.selected) && this.selected.docType == 'html';
  }

  isShowUpload() {
    return true;
  }

  isShowToCreate() {
    return this.isCreate;
  }

  create() {
    this.selected = {};
    this.isEdit = false;
    this.isCreate = true;
    this.modelCreate = {
      articleType: null,
      date: new Date().getTime() / 1000,
      dateStr: this.toStrDate(new Date()),
      html: null,
      id: null,
      link: null,
      name: null,
      slug: null,
      source: 'manual',
      srcId: uuidv4(),
      docType: 'html',
    };
  }

  toCreate() {
    this.modelCreate.date = this.getTime(this.modelCreate.dateStr);

    if (
      this.modelCreate.cateStr != null &&
      this.modelCreate.cateStr != undefined &&
      _.size(this.modelCreate.cateStr) > 0
    ) {
      this.modelCreate.cateStr = JSON.stringify(this.modelCreate.cateStr);
    }

    console.log(this.modelCreate);

    this.loading = true;
    this.apiService
      .create(this.modelCreate)
      .then(() => {
        this.load().then(() => {
          this.selected = {};
          this.isEdit = false;
          this.isCreate = false;
          this.modelCreate = {
            articleType: null,
            date: null,
            dateStr: null,
            html: null,
            id: null,
            link: null,
            name: null,
            slug: null,
            source: 'manual',
            srcId: null,
            docType: 'html',
          };
        });
      })
      .catch((e) => {
        this.loading = false;
        console.log(e);
      });
  }

  save() {
    this.loading = true;
    this.selected.date = this.getTime(this.selected.dateStr);
    if (
      this.modelCreate.cateStr != null &&
      this.modelCreate.cateStr != undefined &&
      _.size(this.modelCreate.cateStr) > 0
    ) {
      this.modelCreate.cateStr = JSON.stringify(this.modelCreate.cateStr);
    }

    this.apiService
      .update(this.selected)
      .then(() => {
        this.load(this.selected).then(() => {
          this.isEdit = false;
          this.isCreate = false;
        });
      })
      .catch((e) => {
        this.loading = false;
        console.log(e);
      });
  }
  edit() {
    this.isEdit = true;
    this.isCreate = false;
  }
  back() {
    this.isEdit = false;
    this.isCreate = false;
    this.selected = {};
    this.modelCreate = {
      articleType: null,
      date: null,
      dateStr: null,
      html: null,
      id: null,
      link: null,
      name: null,
      slug: null,
      source: 'manual',
      srcId: null,
      docType: 'html',
    };
    this.urlimg = '';
  }

  upload() {}

  changeEditorNew(e) {
    console.log(this.modelCreate, e);
  }

  changeEditorEdit(e) {
    console.log(this.selected, e);
  }

  // create
  modelCreate: any = {
    articleType: null,
    date: null,
    dateStr: null,
    html: null,
    id: null,
    link: null,
    name: null,
    slug: null,
    source: 'manual',
    srcId: null,
    docType: 'html',
  };

  toStrDate(a: Date) {
    let m: any = a.getMonth() + 1;
    if (m < 10) {
      m = `0${m}`;
    }

    let d: any = a.getDate();
    if (d < 10) {
      d = `0${m}`;
    }
    return `${a.getFullYear()}-${m}-${d}`;
  }

  toStrDate2(b) {
    const a = new Date(b * 1000);
    let m: any = a.getMonth() + 1;
    if (m < 10) {
      m = `0${m}`;
    }

    let d: any = a.getDate();
    if (d < 10) {
      d = `0${m}`;
    }
    return `${a.getFullYear()}-${m}-${d}`;
  }

  getTime(a) {
    return new Date(a).getTime() / 1000;
  }

  urlimg: any = '';

  insertImg() {
    const img = `<img src='${this.urlimg}' />`;
    this.selected.markdown = this.selected.markdown + `<p>${img}</p>`;
    console.log(this.selected);
    this.urlimg = '';
  }

  insertImgNew() {
    const img = `<img src='${this.urlimg}' />`;
    this.modelCreate.markdown = this.modelCreate.markdown + `<p>${img}</p>`;
    console.log(this.selected);
    this.urlimg = '';
  }

  uuidStt: any = '';
  getUUID() {
    const a = uuidv4();
    navigator.clipboard.writeText(a);
    this.uuidStt = 'Done';
    setTimeout(() => {
      this.uuidStt = '';
    }, 3000);
  }
}
