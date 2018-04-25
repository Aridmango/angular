import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
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
  subredditURL               = 'https://www.reddit.com/r/';
  cryptoCompareURL           = 'https://min-api.cryptocompare.com/data/news/?lang=EN';
	cryptoMarketCapURL         = 'https://api.coinmarketcap.com/v1/ticker/';
  cryptoMarketCapGlobalURL   = 'https://api.coinmarketcap.com/v1/global/';
  cryptoCompareHistoricalURL = 'https://min-api.cryptocompare.com/data/histoday?fsym=';

  subredditHeader = {
    headers: new HttpHeaders({
      'User-agent': 'holder'
    })
  };

  public promiseAll;
  public globalPromise;
  public currenciesPromise;
  public currencyBIRPromise;
  public subRedditNewsPromise;
  public moreCurrenciesPromise;
  public historicalDataPromises;
  public cryptoCompareNewsPromise;
  public historicalDataBIRPromise;
  public historicalPromisesArray = [];

  constructor(private httpClient: HttpClient,
  						private currencyService: CurrencyService,
  						private socialService: SocialService,
              private messageService: MessageService) { }

	initialRequests() {
    var gP = this.httpClient.get<Global>(this.cryptoMarketCapGlobalURL).toPromise();
    var cP = this.httpClient.get<Currency[]>(this.cryptoMarketCapURL + "?start=" + 0 + "&limit=" + 25).toPromise() 
    this.requestCryptoCompareNews();
    this.requestSubRedditNews('CryptoCurrency');

	  this.promiseAll = Promise.all([gP, cP, this.getCryptoCompareNewsPromise(), this.getSubRedditNewsPromise()]);
    this.promiseAll
      .then(res => {
        this.currencyService.setGlobal(res[0]);
        this.currencyService.setCurrencies(res[1]);
        this.currencyService.setPercentageColors(0);
        this.currencyService.setMarketCapPercentage(0);
        this.currencyService.setPercentChangeRelativeToBitcoin(0);
        this.currencyService.setRelativeChangeColors(0);
        this.currencyService.initializeHistoricalDataArray();
        this.requestHistoricalData(res[1], 0, 25);
        this.messageService.setInitialInformation(true);
      });
	}

  requestMoreCurrencies(start: number, limit: number) {
    this.moreCurrenciesPromise = this.httpClient.get<Currency[]>(this.cryptoMarketCapURL + "?start=" + start + "&limit=" + limit).toPromise();
    this.moreCurrenciesPromise
      .then(res => {
        this.currencyService.setCurrencies(res);
        this.currencyService.setPercentageColors(start);
        this.currencyService.setMarketCapPercentage(start);
        this.currencyService.setRelativeChangeColors(start);
        this.currencyService.setPercentChangeRelativeToBitcoin(start);
        this.currencyService.increaseHistoricalDataArraySize();
        this.requestHistoricalData(res, start, limit);
      });
  }

  //Before Initial Request (BIR)
  requestCurrencyBIR(currencyName: string) {
    this.currencyBIRPromise = this.httpClient.get<Currency>(this.cryptoMarketCapURL + currencyName.toLowerCase() + "/").toPromise();
    this.currencyBIRPromise
      .then(res => {
        this.currencyService.setCurrencyBIR(res);
      });
  }

  requestHistoricalData(res: any[], start: number, limit: number) {
    for (let i = 0; i < limit; i++) {
      this.historicalPromisesArray[i + start] = this.httpClient.get(this.cryptoCompareHistoricalURL + res[i].symbol + '&tsym=USD&limit=29').toPromise();
    }
    this.historicalDataPromises = Promise.all(this.historicalPromisesArray);
    this.historicalDataPromises
      .then(res => {
        for (let i = start; i < start+limit; i++) {
          this.currencyService.setHistoricalData(res[i]['Data'], i);
        }
      });
  }

  //Before Initial Request (BIR)
  requestHistoricalDataBIR(currencySymbol: string) {
    console.log(this.cryptoCompareHistoricalURL + currencySymbol + '&tsym=USD&limit=29');
    this.historicalDataBIRPromise = this.httpClient.get(this.cryptoCompareHistoricalURL + currencySymbol + '&tsym=USD&limit=29').toPromise();
    this.historicalDataBIRPromise
      .then(res => {
        this.currencyService.setHistoricalDataBIR(res['Data']);
      });
  }

  requestGlobal() {
    this.globalPromise = this.httpClient.get<Global>(this.cryptoMarketCapGlobalURL).toPromise();
    this.globalPromise
      .then(res => {
        this.currencyService.setGlobal(res);
      });
  }

  requestCryptoCompareNews() {
    this.cryptoCompareNewsPromise = this.httpClient.get(this.cryptoCompareURL).toPromise();
    this.cryptoCompareNewsPromise
      .then(res => {
        this.socialService.setCryptoCompareNews(res);
      });
  }

  requestSubRedditNews(subreddit: string) {
    this.subRedditNewsPromise = this.httpClient.get(this.subredditURL + subreddit + '/top.json?limit=25').toPromise();
    this.subRedditNewsPromise
      .then(res => {
        this.socialService.setSubRedditNews(res.data.children);
      });
  }

  getInitialPromise() {
    return this.promiseAll;
  }

  getMoreCurrenciesPromise() {
    return this.moreCurrenciesPromise;
  }

  getCurrenciesPromise() {
    return this.currenciesPromise;
  }

  getCurrencyBIRPromise() {
    return this.currencyBIRPromise;
  }

  getHistoricalDataPromises() {
    return this.historicalDataPromises;
  }

  getHistoricalDataBIRPromise() {
    return this.historicalDataBIRPromise;
  }

  getGlobalPromise() {
    return this.globalPromise;
  }

  getCryptoCompareNewsPromise() {
    return this.cryptoCompareNewsPromise;
  }

  getSubRedditNewsPromise() {
    return this.subRedditNewsPromise;
  }
}