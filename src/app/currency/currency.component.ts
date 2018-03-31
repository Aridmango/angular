import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiCallsService } from '../apiCalls.service';
import { CurrencyService } from './currency.service';
import { Currency } from './currency.model';
import { HistoricalData } from './historicalData.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
	public currency: Currency;
  public historicalData: HistoricalData[] = [];
	public currencyName: string;
  public date;
  public bitcoinRelativeChange: number;
  public loading: boolean = true;

  constructor(private currencyService: CurrencyService,
              private apiCallsService: ApiCallsService,
  						private route: ActivatedRoute) { }

  ngOnInit() {
  	this.currencyName = this.route.snapshot.params['id'];
  	this.currency = this.currencyService.getCurrency(this.currencyName);
    if (this.currency === null) {
      this.apiCallsService.getRequestSingleCurrency(this.currencyName)
        .then(() => { // Success
            this.currency = this.apiCallsService.getCurrency();
            this.currency = new Currency(this.currency[0].id, this.currency[0].name, this.currency[0].symbol, this.currency[0].rank, this.currency[0].price_usd,
                                         this.currency[0].price_btc, this.currency[0]['24h_volume_usd'], this.currency[0].market_cap_usd, this.currency[0].available_supply, 
                                         this.currency[0].total_supply, this.currency[0].percent_change_1h, this.currency[0].percent_change_24h, this.currency[0].percent_change_7d,
                                         ((+this.currency[0].last_updated)*1000));
            this.apiCallsService.getRequestHistoricalData(this.currency.symbol)
              .then(() => {
                this.loading = false;
              })
          }
        );
    }
    else {
      this.apiCallsService.getRequestHistoricalData(this.currency.symbol)
        .then(() => {
          this.loading = false;
        })
    }
    this.date = this.currencyService.getDate(this.currencyName);
    this.bitcoinRelativeChange = this.currencyService.getBitcoinRelativeChange(this.currencyName);
  }
}