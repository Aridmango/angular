import { Component, OnInit } from '@angular/core';

import { CurrencyService } from '../../../currency/currency.service';
import { Currency } from '../../../currency/currency.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	currencies: Currency[] = [];
	percentageColors: boolean[] = [];
	start = 0;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
  	this.currencies = this.currencyService.getCurrencies();
  	this.percentageColors = this.currencyService.getPercentageColors();
  }

	incrementLimit() {
		this.start = this.start + 25;
		this.currencyService.getRequestCurrency(this.start, 25);
		this.currencies = this.currencyService.getCurrencies();
	} 

}
