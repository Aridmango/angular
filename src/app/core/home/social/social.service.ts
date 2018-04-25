import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { CryptoCompare } from './cryptocompare.model';

@Injectable()
export class SocialService {
  public subRedditNews: any[] = [];
  public slicedUrls: string[] = [];
  public cryptoCompareNews: CryptoCompare[] = [];

  setCryptoCompareNews(news: CryptoCompare[]) {
    for (var i = 0; i < news.length; i++){
      this.cryptoCompareNews.push(news[i]);
    }
    this.setSlicedUrls();
  }

  setSubRedditNews(news: any[]) {
    for (var i = 0; i < news.length; i++){
      this.subRedditNews.push(news[i]);
    }
  }

  setSlicedUrls() {
    for (var i = 0; i < this.cryptoCompareNews.length; i++) {
      //remove .com
      let n = this.cryptoCompareNews[i]['guid'].indexOf('.com');
      let s = this.cryptoCompareNews[i]['guid'].substring(0, n != -1 ? n+4 : this.cryptoCompareNews[i]['guid'].length);
      //remove https://
      n = this.cryptoCompareNews[i]['guid'].indexOf('https://');
      s = s.substring(n != -1 ? n+8 : 0, this.cryptoCompareNews[i]['guid'].length);
      //remove http://
      n = this.cryptoCompareNews[i]['guid'].indexOf('http://');
      s = s.substring(n != -1 ? n+7 : 0, this.cryptoCompareNews[i]['guid'].length);
      //remove www.
      n = s.indexOf('www.');
      s = s.substring(n != -1 ? n+4 : 0, this.cryptoCompareNews[i]['guid'].length);
      this.slicedUrls.push(s);
    }
  }

  getSubRedditNews() {
    return this.subRedditNews;
  }

  getCryptoCompareNews() {
    return this.cryptoCompareNews;
  }

  getSlicedUrls() {
    return this.slicedUrls;
  }
}