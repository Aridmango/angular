import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CurrencyService } from './currency.service';
import { Currency } from './currency.model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
	public currency: Currency;
	public currencyName: string;

  constructor(private currencyService: CurrencyService,
  						private route: ActivatedRoute) { }

  ngOnInit() {
  	this.currencyName = this.route.snapshot.params['id'];
  	this.currency = this.currencyService.getCurrency(this.currencyName);
  	//console.log("this", this.currency);
  }
}
