import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { CryptoCompare } from './cryptocompare.model';

@Injectable()
export class SocialService {
  public ccNews: CryptoCompare[] = [];
	ccURL = 'https://min-api.cryptocompare.com/data/news/?lang=EN';
  public slicedUrls: string[] = [];

  constructor(private httpClient: HttpClient) { }

  setCCNews(news: CryptoCompare[]) {
    for (var i = 0; i < news.length; i++){
      this.ccNews.push(news[i]);
    }
  }

  getCCNews() {
    return this.ccNews;
  }

  sliceUrls() {
    for (var i = 0; i < this.ccNews.length; i++) {
      //remove .com
      let n = this.ccNews[i]['guid'].indexOf('.com');
      let s = this.ccNews[i]['guid'].substring(0, n != -1 ? n+4 : this.ccNews[i]['guid'].length);
      //remove https://
      n = this.ccNews[i]['guid'].indexOf('https://');
      s = s.substring(n != -1 ? n+8 : 0, this.ccNews[i]['guid'].length);
      //remove http://
      n = this.ccNews[i]['guid'].indexOf('http://');
      s = s.substring(n != -1 ? n+7 : 0, this.ccNews[i]['guid'].length);
      //remove www.
      n = s.indexOf('www.');
      s = s.substring(n != -1 ? n+4 : 0, this.ccNews[i]['guid'].length);
      this.slicedUrls.push(s);
    }
  }

  getSlicedUrls() {
    return this.slicedUrls;
  }
}