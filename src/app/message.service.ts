import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
	private subject = new Subject<any>();
  nightMode = false;
  initialInformation: boolean = false;

  constructor() { }

  toggleNightMode(){
    this.nightMode = !this.nightMode;
    this.subject.next(this.nightMode);
  }

  getNightMode() {
    return this.subject.asObservable();
  }

  setInitialInformation(v: boolean) {
    this.initialInformation = v;
  }

  getInitialInformation() {
    return this.initialInformation;
  }
}