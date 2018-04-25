import { Component, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subscription } from 'rxjs/Subscription';

import { CurrencyService } from './currency/currency.service';
import { MessageService } from './message.service'
import { SocialService } from "./core/home/social/social.service";
import { Currency } from './currency/currency.model';
import { ApiCallsService } from './apiCalls.service'
import { ChartsService } from "./currency/charts/charts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyService, MessageService, SocialService, ApiCallsService, ChartsService]
})
export class AppComponent {
  title = 'app';
  nightMode = false;
  subscription = new Subscription;

	constructor(private currencyService: CurrencyService,
              private messageService: MessageService, 
              private socialService: SocialService,
              private apiCallsService: ApiCallsService,
              private chartsService: ChartsService) 
  { 
    this.subscription = this.messageService.getNightMode()
      .subscribe(res => {this.nightMode = res;});
    this.apiCallsService.initialRequests();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
