import { Component, OnInit } from '@angular/core';

import { ApiCallsService } from '../../../apiCalls.service';
import { CurrencyService } from '../../../currency/currency.service';
import { Currency } from '../../../currency/currency.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	currencies: Currency[] = [];
	expandedRow: number[];
	marketCapPercentage: number[];
	percentageColors: boolean[] = [];
	bitcoinRelativeColors: boolean[] = [];
	start = 0;
	bitcoinRelativeChanges: number[] = [];

  constructor(private currencyService: CurrencyService,
  						private apiCallsService: ApiCallsService) { }

  ngOnInit() {
  	this.currencies = this.currencyService.getCurrencies(); 
  	this.expandedRow = new Array(this.currencies.length);
  	this.percentageColors = this.currencyService.getPercentageColors();
  	this.marketCapPercentage = this.currencyService.getMarketCapPercentage();
  	this.bitcoinRelativeChanges = this.currencyService.getBitcoinRelativeChanges();
    console.log("relative bitcoinRelativeChanges", this.bitcoinRelativeChanges);
  	this.bitcoinRelativeColors = this.currencyService.getBitcoinRelativeColors();
    console.log("relative color", this.bitcoinRelativeColors)
  }

	incrementLimit() {
		this.start = this.start + 25;
		this.apiCallsService.getRequestMoreCurrencies(this.start, 25);
		this.currencies = this.currencyService.getCurrencies();
	}
}
