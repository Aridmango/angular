import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subscription } from 'rxjs/Subscription';

import { CurrencyService } from './currency/currency.service';
import { MessageService } from './message.service'
import { SocialService } from "./core/home/social/social.service";
import { Currency } from './currency/currency.model';
import { ApiCallsService } from './apiCalls.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyService, MessageService, SocialService, ApiCallsService]
})
export class AppComponent implements OnInit {
  title = 'app';
  nightMode = false;
  subscription = Subscription;
  //intialInformation: boolean = false;

	constructor(private currencyService: CurrencyService,
              private messageService: MessageService, 
              private socialService: SocialService,
              private apiCallsService: ApiCallsService) { 
    this.subscription = this.messageService.getNightMode()
      .subscribe(value => {this.nightMode = value;});
  }

  ngOnInit() {
  	this.apiCallsService.initialGetRequests();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
