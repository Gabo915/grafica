import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private interval: any; // Variable para almacenar el intervalo

  constructor(private http: HttpClient) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'line'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Monitor de transacciones',
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter: function(val: string, opts: any) {
          return (
            val +
            ' - <strong>' +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            '</strong>'
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: []
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val: number) {
                return val + ' (mins)';
              }
            }
          },
          {
            title: {
              formatter: function(val: number) {
                return val + ' por hora';
              }
            }
          },
          {
            title: {
              formatter: function(val: number) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      yaxis: {
        labels: {
          formatter: function(val: number) {
            return val.toString();
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.getData(); // Obtener datos al iniciar componente
    this.startInterval(); // Iniciar intervalo
  }

  ngOnDestroy(): void {
    clearInterval(this.interval); // Limpiar intervalo al destruir componente
  }

  getData() {
    this.http.get<any>('http://localhost:5000/grafica').subscribe(
      data => {
        this.chartOptions = {
          ...this.chartOptions,
          series: data.series || [],
          xaxis: {
            ...this.chartOptions.xaxis,
            categories: data.categories || []
          }
        };
  
        if (this.chart) {
          this.chart.updateOptions(this.chartOptions);
        }
      },
      error => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.getData(); // Llamar a la función para obtener datos cada intervalo
    }, 60000); // Intervalo de 1 minuto (60000 milisegundos)
  }
}