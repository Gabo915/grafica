import { Component,OnInit,ViewChild  } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


//import { ChartHostComponent } from '../chart-host/chart-host.component';


@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css'],
})
export class GraficaComponent implements OnInit{

  public lineChartData:Array<any> = [
    {data: [65, 59, 28, 56, 40], label: 'Ventas'}
  ];

  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo']

  ngOnInit(): void {
    setInterval(()=>{
      const newData = [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]

    }, 3000);
  }

  

  

}
