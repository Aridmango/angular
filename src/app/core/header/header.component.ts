import { Component} from '@angular/core';

import { MessageService } from '../../message.service'
import { CurrencyService } from '../../currency/currency.service'
import { ApiCallsService } from '../../apiCalls.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	global: any = null;

  constructor(private messageService: MessageService,
  			  		private currencyService: CurrencyService,
  			 			private apiCallsService: ApiCallsService) {
  	this.apiCallsService.getInitialPromise()
  	.then(res => {
      this.global = res[0];
    });
  }

  toggleNightMode(){
  	this.messageService.toggleNightMode();
  }

}