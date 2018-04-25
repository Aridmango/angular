import { Component} from '@angular/core';
import { Chart } from 'chart.js';

import { ApiCallsService } from '../../../apiCalls.service';
import { CurrencyService } from '../../../currency/currency.service';
import { ChartsService } from '../../../currency/charts/charts.service';
import { Currency } from '../../../currency/currency.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
	currencies: Currency[] = [];
	expandedRow: number[] = [];
	marketCapPercentage: number[];
	percentageColors: boolean[] = [];
	bitcoinRelativeColors: boolean[] = [];
	bitcoinRelativeChanges: any[] = [];
  public historicalPromises;
  public historicalData;
  public loading = [];
  start = 0;

  constructor(private currencyService: CurrencyService,
  						private apiCallsService: ApiCallsService,
              private chartsService: ChartsService) {
    this.apiCallsService.getInitialPromise()
      .then(value => {
        this.currencies = this.currencyService.getCurrencies(); 
        this.expandedRow = new Array(this.currencies.length);
        this.percentageColors = this.currencyService.getPercentageColors();
        this.marketCapPercentage = this.currencyService.getMarketCapPercentage();
        this.bitcoinRelativeChanges = this.currencyService.getBitcoinRelativeChanges();
        this.bitcoinRelativeColors = this.currencyService.getBitcoinRelativeColors();
        this.historicalPromises = this.apiCallsService.getHistoricalDataPromises();
        this.historicalPromises
          .then(() => {
            this.historicalData = this.currencyService.getHistoricalData();
            for (let i = 0; i < 25; i++) {
              if (this.historicalPromises.__zone_symbol__value[i].Response == "Success")
                this.loading[i] = false;
              else
                this.loading[i] = false;
            }
          });
      });
  }

	incrementLimit() {
		this.start = this.start + 25;
		this.apiCallsService.requestMoreCurrencies(this.start, 25);
    this.historicalPromises = this.apiCallsService.getHistoricalDataPromises()
    this.historicalPromises
      .then(() => {
        this.historicalData = this.currencyService.getHistoricalData();
        for (let i = 0; i < 25; i++) {
          if (this.historicalPromises.__zone_symbol__value[i].Response === "Success")
            this.loading[i] = false;
          else
            this.loading[i] = true;
        }
      });
		this.currencies = this.currencyService.getCurrencies();
	}
}
