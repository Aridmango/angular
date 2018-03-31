import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { Currency } from './currency.model';
import { Global } from './global.model';
import { HistoricalData } from './historicalData.model';

@Injectable()
export class CurrencyService {
	public currency: Currency[] = [];
  public historicalData: HistoricalData[] = [];
  public global: Global;
  public marketCapPercentage: number[] = [];
	percentageColors: boolean[] = [];
  bitcoinRelativeColors: boolean[] = [];
  public dates;
  bitcoinRelativeChange: number[] = [];
	cmcURL = 'https://api.coinmarketcap.com/v1/ticker/?start=';
  cmcgURL= 'https://api.coinmarketcap.com/v1/global/';

  constructor(private httpClient: HttpClient) { }

  setCurrencies(data: Currency[]) {
	  for (var i = 0; i < data.length; i++){
	  	this.currency.push(data[i]);
      this.currency[i].last_updated = ((+this.currency[i].last_updated)*1000);
  	}
  }

  getCurrency(currencyName: string) {
  	for (var i = 0; i < this.currency.length; i++){
  		if (currencyName === this.currency[i].id)
  			return this.currency[i];
  	}
  	return null;
  }

  getCurrencies() {
  	return this.currency;
  }

  setPercentageColors(start: number) {
  	for (var i = start; i < this.currency.length; i++) {
  		if (+this.currency[i].percent_change_24h > 0)
  			this.percentageColors.push(true);
  		else
  			this.percentageColors.push(false);
  	}
  }

  getPercentageColors() {
  	return this.percentageColors;
  }

  calculateMarketCapPercentage(start: number) {
    for (var i = start; i < this.currency.length; i++) {
      this.marketCapPercentage.push((+this.currency[i]['market_cap_usd'])/(+this.global['total_market_cap_usd']))
    }
  }

  getMarketCapPercentage() {
    return this.marketCapPercentage;
  }

  getDate(currencyName: string) {
    for (var i = 0; i < this.currency.length; i++){
      if (currencyName === this.currency[i].id)
        return this.dates[i];
    }
    return null;
  }

  percentChangeRelativeToBitcoin(start: number) {
    for (var i = start; i < this.currency.length; i++) {
      this.bitcoinRelativeChange.push(
        +this.currency[i].percent_change_24h - +this.currency[0].percent_change_24h)
    }
    console.log(this.bitcoinRelativeChange);
  }

  getBitcoinRelativeChange(currencyName: string) {
    for (var i = 0; i < this.currency.length; i++){
      if (currencyName === this.currency[i].id)
        return this.bitcoinRelativeChange[i];
    }
    return null;
  } 

  getBitcoinRelativeChanges() {
    return this.bitcoinRelativeChange;
  } 

  setRelativeChangeColors(start: number) {
    for (var i = start; i < this.currency.length; i++) {
      if (+this.bitcoinRelativeChange[i] >= 0)
        this.bitcoinRelativeColors.push(true);
      else
        this.bitcoinRelativeColors.push(false);
    }
  }

  getBitcoinRelativeColors() {
    return this.bitcoinRelativeColors;
  }

  setGlobal(g: any) {
    this.global = g;
  }
}