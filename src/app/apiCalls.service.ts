import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { CurrencyService } from './currency/currency.service';
import { SocialService } from './core/home/social/social.service';
import { MessageService } from './message.service';
import { Currency } from './currency/currency.model';
import { Global } from './currency/global.model';
import { HistoricalData } from './currency/historicalData.model';

@Injectable()
export class ApiCallsService {
	public currency: Currency;
  public historicalData: HistoricalData[] = [];
  public global: Global;
	cmcURL = 'https://api.coinmarketcap.com/v1/ticker/';
  cmcgURL= 'https://api.coinmarketcap.com/v1/global/';
  ccURL = 'https://min-api.cryptocompare.com/data/news/?lang=EN';
  ccHistoricalURL = 'https://min-api.cryptocompare.com/data/histoday?fsym=';

  public globalPromise;
	public currenciesPromise;
	public ccPromise;
  public singleCurrencyPromise;

  constructor(private httpClient: HttpClient,
  						private currencyService: CurrencyService,
  						private socialService: SocialService,
              private messageService: MessageService) { }

	initialGetRequests() {
    this.globalPromise = this.httpClient.get<Global>(this.cmcgURL).toPromise()
    this.currenciesPromise = this.httpClient.get<Currency[]>(this.cmcURL + "?start=" + 0 + "&limit=" + 25).toPromise()
    this.ccPromise = this.httpClient.get<Global[]>(this.ccURL).toPromise()

	  let p = Promise.all([this.globalPromise, this.currenciesPromise, this.ccPromise])
	  .then(value => {
	  	this.currencyService.setGlobal(value[0]);
	  	this.currencyService.setCurrencies(value[1]);
      this.currencyService.setPercentageColors(0);
      this.currencyService.percentChangeRelativeToBitcoin(0);
      this.currencyService.setRelativeChangeColors(0);
      this.currencyService.calculateMarketCapPercentage(0)
      this.socialService.setCCNews(value[2]);
      this.socialService.sliceUrls();
      this.messageService.setInitialInformation(true);
	  });
	}

	getRequestGlobal() {
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get<Global>(this.cmcgURL)
        .toPromise()
        .then(
          res => { // Success
            this.global = res;
            resolve();
          }
        );
    });
  }

  getRequestMoreCurrencies(start: number, limit: number) {
    let promise = new Promise((resolve, reject) => {
	    this.httpClient.get<Currency[]>(this.cmcURL + "?start=" + start + "&limit=" + limit)
	      .toPromise()
	      .then(
	        res => { // Success
	          this.currencyService.setCurrencies(res);
	          this.currencyService.setPercentageColors(start);
            this.currencyService.percentChangeRelativeToBitcoin(start);
            this.currencyService.setRelativeChangeColors(start);
            this.currencyService.calculateMarketCapPercentage(start)
	          resolve();
	        }
	      );
	  });
  }

  getRequestSingleCurrency(currencyName: string) {
    return this.httpClient.get<Currency>(this.cmcURL + currencyName.toLowerCase() + "/").toPromise()
    .then(res => {this.currency = res});
  }

  getRequestHistoricalData(currencySymbol: string) {
    return this.httpClient.get(this.ccHistoricalURL + currencySymbol + '&tsym=USD&limit=29').toPromise()
    .then(res => {
      console.log("res data", res.Data)
      this.historicalData = res.Data;
      console.log("get request", this.historicalData);
    });
  }

  getCurrency() {
    return this.currency;
  }

  getHistoricalData() {
    return this.historicalData;
  }
}