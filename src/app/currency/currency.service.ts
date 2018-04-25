import { Injectable } from '@angular/core';
import 'rxjs/Rx';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { Currency } from './currency.model';
import { Global } from './global.model';
import { HistoricalData } from './historicalData.model';

@Injectable()
export class CurrencyService {
  public global: Global;
  public currencyBIR: Currency;
  public historicalDataBIR: HistoricalData;

  public historicalData;
  public dates: any[] = [];
  public currency: Currency[] = [];
  public percentageColors: boolean[] = [];
  public marketCapPercentage: number[] = [];
  public bitcoinRelativeChange: number[] = [];
  public bitcoinRelativeColors: boolean[] = [];

  constructor() { }

  setCurrencies(data: Currency[]) {
	  for (var i = 0; i < data.length; i++){
	  	this.currency.push(data[i]);
      this.currency[i].last_updated = ((+this.currency[i].last_updated)*1000);
  	}
  }

  setCurrencyBIR(currency: Currency) {
    this.currencyBIR = currency;
    this.currencyBIR.last_updated = ((+this.currencyBIR.last_updated)*1000);
  }

  setPercentageColors(start: number) {
  	for (var i = start; i < this.currency.length; i++) {
  		if (+this.currency[i].percent_change_24h > 0)
  			this.percentageColors.push(true);
  		else
  			this.percentageColors.push(false);
  	}
  }

  setMarketCapPercentage(start: number) {
    for (var i = start; i < this.currency.length; i++) {
      this.marketCapPercentage.push((+this.currency[i]['market_cap_usd'])/(+this.global['total_market_cap_usd']))
    }
  }

  setPercentChangeRelativeToBitcoin(start: number) {
    for (var i = start; i < this.currency.length; i++) {
      this.bitcoinRelativeChange.push(
        +this.currency[i].percent_change_24h - +this.currency[0].percent_change_24h)
    }
  }

  setRelativeChangeColors(start: number) {
    for (var i = start; i < this.currency.length; i++) {
      if (+this.bitcoinRelativeChange[i] >= 0)
        this.bitcoinRelativeColors.push(true);
      else
        this.bitcoinRelativeColors.push(false);
    }
  }

  initializeHistoricalDataArray() {
    this.historicalData = Array(25).fill(null);
  }

  increaseHistoricalDataArraySize() {
    this.historicalData.length += 25;
  }

  setHistoricalData(data: HistoricalData[], index: number) {
    this.historicalData[index] = data;
  }

  setHistoricalDataBIR(data: HistoricalData) {
    this.historicalDataBIR = data;
  }

  setGlobal(g: any) {
    this.global = g;
  }

  getCurrencies() {
    return this.currency;
  }

  getCurrency(currencyName: string) {
    for (var i = 0; i < this.currency.length; i++){
      if (currencyName === this.currency[i].id)
        return this.currency[i];
    }
    return null;
  }

  getCurrencyBIR(){
    return this.currencyBIR;
  }

  getPercentageColors() {
    return this.percentageColors;
  }

  getMarketCapPercentage() {
    return this.marketCapPercentage;
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

  getBitcoinRelativeColors() {
    return this.bitcoinRelativeColors;
  }

  getHistoricalData() {
    return this.historicalData;
  }

  getHistoricalDataBIR() {
    return this.historicalDataBIR;
  }

  getGlobal() {
    return this.global;
  }

  getDate(currencyName: string) {
    for (var i = 0; i < this.currency.length; i++){
      if (currencyName === this.currency[i].id)
        return this.dates[i];
    }
    return null;
  }
}