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
    //If the user goes to a /currency/* route before being to the main page
    if (this.currency === null) {
      this.apiCallsService.requestCurrencyBIR(this.currencyName);
      this.apiCallsService.getCurrencyBIRPromise()
        .then(res => {
          this.currency = this.currencyService.getCurrencyBIR();
          this.currency = this.currency[0];
      }).then(() => {
        this.apiCallsService.requestHistoricalDataBIR(this.currency.symbol);
        this.apiCallsService.getHistoricalDataBIRPromise()
          .then(res => {
            this.historicalData = res['Data'];
            console.log(res)
            this.loading = false;
          })
      });
    }
    else {
      this.apiCallsService.getHistoricalDataPromises()
        .then(res => {
          var allHistoricalData = this.currencyService.getHistoricalData();
          var currencyData = this.currencyService.getCurrencies();
          for (var i = 0; i < currencyData.length; i++){
            if (this.currencyName === currencyData[i].id)
              this.historicalData = allHistoricalData[i];
          }
          this.loading = false;
        });
    }

    this.date = this.currencyService.getDate(this.currencyName);
    this.bitcoinRelativeChange = this.currencyService.getBitcoinRelativeChange(this.currencyName);
  }
}