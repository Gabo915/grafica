import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';
import { dataSeries } from './datos-render';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {

  public series: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;

  constructor() {
    this.series = [];
    this.chart = { type: 'line' };
    this.dataLabels = { enabled: true };
    this.markers = { size: 5 };
    this.title = { text: 'Chart Title' };
    this.fill = { type: 'solid' };
    this.yaxis = { title: { text: 'Y-Axis' } };
    this.xaxis = { categories: [] };
    this.tooltip = { enabled: true };
    
    this.initChartData();
  }

  ngOnInit() {}

  public initChartData(): void {
    let ts2 = 1484418600000;
    let dates1 = [];
    let dates2 = [];
    let dates3 = [];

    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;

      // Asegúrate de que los datos existen antes de usarlos
      if (dataSeries[1] && dataSeries[1][i]) {
        dates1.push([ts2, dataSeries[1][i].value]);
      }
      if (dataSeries[2] && dataSeries[2][i]) {
        dates2.push([ts2, dataSeries[2][i].value]);
      }
      if (dataSeries[3] && dataSeries[3][i]) {
        dates3.push([ts2, dataSeries[3][i].value]);
      }
    }

    this.series = [
      {
        name: "Series 1",
        data: dates1,
        color: '#FF0000' // Rojo
      },
      {
        name: "Series 2",
        data: dates2,
        color: '#00FF00' // Verde
      },
      {
        name: "Series 3",
        data: dates3,
        color: '#FFA500' // Naranja (en lugar de amarillo)
      }
    ];

    this.chart = {
      type: "line",
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: "zoom"
      }
    };

    this.dataLabels = {
      enabled: false
    };

    this.markers = {
      size: 0
    };

    this.title = {
      text: "Stock Price Movement",
      align: "left"
    };

    this.fill = {
      type: "solid", // Cambiado a 'solid' para colores sólidos
    };

    this.yaxis = {
      labels: {
        formatter: function(val) {
          return (val / 1000000).toFixed(0);
        }
      },
      title: {
        text: "Price"
      }
    };

    this.xaxis = {
      type: "datetime"
    };

    this.tooltip = {
      shared: false,
      y: {
        formatter: function(val) {
          return (val / 1000000).toFixed(0);
        }
      }
    };
  }

}