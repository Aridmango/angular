import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, AfterViewInit {
  chart: Chart[] = [];
  @Input() ctx;
  @Input() data;
  id: string;

  constructor(private chartsService: ChartsService) { }

  ngOnInit() {
    this.id = "canvas" + this.ctx;
  }

  ngAfterViewInit()
  {
    console.log(this.data)
    if (this.data.length !== 0)
      this.chart = this.chartsService.createChart(this.data, this.ctx);
    else 
      console.warn("no data for chart");
  }
}
