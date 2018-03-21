import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { CurrencyService } from './currency/currency.service';
import { Currency } from './currency/currency.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyService]
})
export class AppComponent implements OnInit {
  title = 'app';

	constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
  	this.requestAPI();
  }

  //subscribe to a get request issued by the CurrencySerive
  //for a specific currency
  requestAPI() {
  	this.currencyService.getRequestCurrency(0,25)
  		// .subscribe(data => {
    //     console.log("request api", data)
  		// 	this.currencyService.setCurrencies(data);
  		// });
  }
}
