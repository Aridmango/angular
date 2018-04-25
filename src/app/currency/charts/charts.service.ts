import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { CurrencyService } from '../currency.service';
import { HistoricalData } from '../historicalData.model';

@Injectable()
export class ChartsService {
  chart: Chart[] = [];
  dates: Date[] = [];
  historicalData: HistoricalData[] = [];
  highs: number[] = [];
  lows: number[] = [];
  jsdate: any;

  constructor(private currencyService: CurrencyService) { }

  createChart(data: any[] = null, i: number = null) {
    this.highs.length = 0;
    this.lows.length = 0;
    for (let i = 0; i < 30; i++) {
      this.highs.push(+data[i].high);
      this.lows.push(+data[i].low)
    }

    this.fixDates(data);
    if (i == null)
      var ctx = "canvas0";
    else 
      var ctx = "canvas" + i;
    return new Chart(ctx, {
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

  fixDates(data: HistoricalData[]) {
    this.dates.length = 0;
    for (let i = 0; i < 30; i++) {
      this.jsdate = new Date((+data[i].time) * 1000);
      this.dates.push(this.jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
    }
  }
}