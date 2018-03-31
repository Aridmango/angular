import { Component, OnInit } from '@angular/core';

import { CryptoCompare } from '../cryptocompare.model';
import { SocialService } from '../social.service';

@Component({
  selector: 'app-cryptocompare',
  templateUrl: './cryptocompare.component.html',
  styleUrls: ['./cryptocompare.component.css']
})
export class CryptocompareComponent implements OnInit {
  public ccNews: CryptoCompare[] = [];
  public showNews: CryptoCompare[] = [];
  public limit: number = 5;
  public slicedUrls: string[] = [];

  constructor(private socialService: SocialService) {
  	this.ccNews = this.socialService.getCCNews();
  	this.slicedUrls = this.socialService.getSlicedUrls();
  }

  ngOnInit() {
  }

  newsLimit(i: number) {
    return i <= this.limit;
  }

  increaseNewsLimit() {
    this.limit = this.limit + 5;
  }
}
