import { Component } from '@angular/core';

import { SocialService } from '../social.service';
import { ApiCallsService } from '../../../../apiCalls.service';

@Component({
  selector: 'app-cryptocurrencysubreddit',
  templateUrl: './cryptocurrencysubreddit.component.html',
  styleUrls: ['./cryptocurrencysubreddit.component.css']
})
export class CryptocurrencysubredditComponent {
	public subRedditNews: any[] = [];
	public showNews: any[] = [];
	public limit: number = 4;
  public slicedUrls: string[] = [];

  constructor(private socialService: SocialService,
              private apiCallsService: ApiCallsService) {
    this.apiCallsService.getInitialPromise()
    .then(value => {
      this.subRedditNews = this.socialService.getSubRedditNews();
      this.subRedditNews = this.removeRedditDomains(this.subRedditNews);
    });
  }

  newsLimit(i: number) {
    return i <= this.limit;
  }

  increaseNewsLimit() {
    this.limit = this.limit + 5;
  }

  removeRedditDomains(news: any) {
    let newNews: any[] = [];
    for (let article of news){
      if (!(article.data.domain === 'i.redd.it' || article.data.domain === 'self.CryptoCurrency' ||
            article.data.domain === 'v.redd.it')){
        newNews.push(article);
      }
    }
    return newNews;
  }
}