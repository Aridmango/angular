import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { Currency } from './currency.model';

// export interface Currency {
// 	id: string;
// 	name: string;
// 	symbol: string;
// 	rank: string;
// 	price_usd: string;
// 	price_btc: string;
// 	day_volume_usd: string;
// 	market_cap_usd: string;
// 	available_supply: string;
// 	total_supply: string;
// 	percent_change_1h: string;
// 	percent_change_24h: string;
// 	percent_change7d: string;
// 	last_updated: string;
// }

@Injectable()
export class CurrencyService {
	public currency: Currency[] = [];
	percentageColors: boolean[] = [];
	cmcURL = 'https://api.coinmarketcap.com/v1/ticker/?start=';

  constructor(private httpClient: HttpClient) { }


  getRequestCurrency(start: number, limit: number) {
    // return this.httpClient.get<Currency>(this.cmcURL)
    //   .map(
    //     (data) => {
    //       return data;
    //     }
    //   );

    let promise = new Promise((resolve, reject) => {
	    this.httpClient.get<Currency[]>(this.cmcURL + start + "&limit=" + limit)
	      .toPromise()
	      .then(
	        res => { // Success
	          //console.log("in the promise", res);
	          this.setCurrencies(res);
	          this.setPercentageColors();
	          resolve();
	        }
	      );
	  });
	  //return promise;


  }

  setCurrencies(data: Currency[]) {
	  for (var i = 0; i < data.length; i++){
	  	this.currency.push(data[i]);
  	}
  }

  getCurrency(currencyName: string) {
  	for (var i = 0; i < this.currency.length; i++){
  		if (currencyName === this.currency[i].id)
  			return this.currency[i];
  	}
  	return this.currency[14];
  }

  getCurrencies() {
  	return this.currency;
  }

  setPercentageColors() {
  	console.log("setpercentagecolors", this.currency.length)
  	for (var i = 0; i < this.currency.length; i++) {
  		if (+this.currency[i].percent_change_24h > 0)
  			this.percentageColors.push(true);
  		else
  			this.percentageColors.push(false);
  	}
  }

  getPercentageColors() {
  	return this.percentageColors;
  }


// this.currency.id = data[i].id;
	  	// this.currency.name = data[i].name
	  	// this.currency.symbol = data[i].symbol
	  	// this.currency.rank = data[i].rank
	  	// this.currency.price_usd = data[i].price_usd
	  	// this.currency.price_btc = data[i].price_btc
	  	// this.currency.day_volume_usd = data[i].day_volume_usd
	  	// this.currency.market_cap_usd = data[i].market_cap_usd
	  	// this.currency.available_supply = data[i].available_supply
	  	// this.currency.total_supply = data[i].total_supply
	  	// this.currency.percent_change_1h = data[i].percent_change_1h
	  	// this.currency.percent_change_24h = data[i].percent_change_24h
	  	// this.currency.percent_change_7d = data[i].percent_change_7d
	  	// this.currency.last_updated = data[i].last_updated

  //Works
  // getCurrency() {
  //   this.httpClient.get(this.cmcURL)
  //     .map(
  //       (data) => {
  //         console.log(data);
  //         return data;
  //       }
  //     ).subscribe(data => console.log('GOT DATA', data));
  // }
}