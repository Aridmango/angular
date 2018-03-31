import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { ApiCallsService } from '../../apiCalls.service';
import { HistoricalData } from '../historicalData.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
	chart: Chart[] = [];
	dates: Date[] = [];
	historicalData: HistoricalData[] = [];
	highs: number[] = [];
	lows: number[] = [];
  jsdate: any;

  constructor(private apiCallsService: ApiCallsService) { }

  ngOnInit() {
  	this.historicalData = this.apiCallsService.getHistoricalData();
  	console.log(this.historicalData);
  	for (let i = 0; i < 30; i++) {
  		this.highs.push(+this.historicalData[i].high);
  		this.lows.push(+this.historicalData[i].low)
  	}
  	console.log(this.highs);
  	console.log(this.lows)

  	this.fixDates();
  	this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          { 
            data: this.highs,
            label: "Highs",
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            data: this.lows,
            label: "Lows",
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: true,
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  fixDates() {
  	for (let i = 0; i < 30; i++) {
  		this.jsdate = new Date((+this.historicalData[i].time) * 1000);
  		this.dates.push(this.jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
  	}
  }
}
