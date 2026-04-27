import { RecursionService } from './../service/recursion/recursion.service';
import { SeriesService } from './../service/series/series.service';
import { TabService } from './../service/tab/tab.service';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonImg, IonCardContent, IonItem, IonInput, IonButton, IonCardTitle, IonList, IonLabel } from '@ionic/angular/standalone';
import { MyHeaderComponent } from "../my-header/my-header.component";
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.page.html',
  styleUrls: ['./servicepage.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonInput, IonItem, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MyHeaderComponent, IonCard, IonCardHeader, IonCardContent, IonButton, IonCardTitle]
})
export class ServicepagePage implements OnInit {
  xySeries = new Map<string, number>();
  xyRecursion = new Map<string, number>();
  yyyOutput: string[] = [];

  errorXn: string = '';
  errorXk: string = '';
  errorH: string = '';
  constructor(private tabService: TabService, private seriesService: SeriesService, private recursionService: RecursionService) { 
    Chart.register(...registerables);
  }

  xx: string[] = [];
  yySer: string[] = [];
  yyRec: string[] = [];
  yyTab: string[] = []; 
  yyTabNum: number[] = []; 

  @ViewChild('lineCanvas') private lineCanvas?: ElementRef;
  lineChart: any;
  lineChartMake() {
    if (this.lineChart instanceof Chart) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: this.xx,
        datasets: [
          {
            label: 'Табулювання', 
            data: this.yyTab,
            fill: false,
            borderColor: 'red',
            borderWidth: 1,
            borderDashOffset: 0.0,
            pointRadius: 2,
            spanGaps: false
          },
          {
            label: 'Рекурсія', 
            data: this.yyRec,
            fill: false,
            borderColor: 'green',
            borderWidth: 1,
            borderDashOffset: 0.0,
            pointRadius: 4,
            spanGaps: false
          },
          {
            label: 'Ряд', 
            data: this.yySer,
            fill: false,
            borderColor: 'blue',
            borderWidth: 1,
            borderDashOffset: 0.0,
            pointRadius: 6,
            spanGaps: false
          },
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            suggestedMin: -1,
            title: { display: true, text: 'X' },
            ticks: { stepSize: 0.001 },
          },
          y: {
            title: { display: true, text: 'Y' },
            ticks: { stepSize: 0.001 }
          }
        }
      }
    })
  }

  ras(xn: any, xk: any, h: any) {
    this.errorXn = '';
    this.errorXk = '';
    this.errorH = '';

    let xn1 = parseFloat(xn),
    xk1 = parseFloat(xk),
    h1 = parseFloat(h);
    
    if (xn1 < -1 || xn1 > 1) {
      this.errorXn = 'Введіть число від -1 до 1';
    }
    if (xk1 < -1 || xk1 > 1) {
      this.errorXk = 'Введіть число від -1 до 1';
    }
    if (h1 > (xk1 - xn1)) {
      this.errorH = 'Недопустиме значення. Введіть інше значення';
    }

    if (this.errorXn || this.errorXk || this.errorH) return;
    
    try { 
      this.xx = [];
      this.yyTab = [];
      console.log('Табулювання');
      let xyTab = this.tabService.getTab(xn1, xk1, h1);
      this.xx = xyTab.x;
      this.yyTabNum = xyTab.y; 
      this.yyTab = xyTab.y.map(v => v.toFixed(4));

      console.log('Ряд');
      this.xySeries = this.seriesService.getTab(xn1, xk1, h1);

      console.log('Рекурсія');
      this.xyRecursion = this.recursionService.getTab(xn1, xk1, h1);

      this.output();

      this.lineChartMake();
    } catch {}
  }

  output() {
    this.yySer = new Array();
    this.yyRec = new Array();
    this.yyyOutput = [];
    this.xx.forEach((value, index) => {
      let s = '';
      let y: number = 0;
      y = this.yyTabNum[index] ?? 0;
      s = y.toFixed(4) + ' ';
      y = this.xySeries.get(value) ?? 0;
      this.yySer.push(y.toFixed(4));
      s = s + y.toFixed(4);
      y = this.xyRecursion.get(value) ?? 0;
      this.yyRec.push(y.toFixed(4));
      s = s + ' ' + y.toFixed(4);
      console.log(s);
      this.yyyOutput.push(s);
    })
  }

  ngOnInit() {}
}
