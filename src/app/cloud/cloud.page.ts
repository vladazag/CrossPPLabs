import { facultyList } from './../class/Faculty/facultyList';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Chart, registerables } from 'chart.js';
import { LoadingController, AlertController } from '@ionic/angular';
import { Faculty } from '../class/Faculty/faculty';
import { MyHeaderComponent } from "../my-header/my-header.component";

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.page.html',
  styleUrls: ['./cloud.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MyHeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent]
})
export class CloudPage implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas?: ElementRef;
  faculties = new facultyList();
  dataUrl = 'https://api.jsonbin.io/v3/b/69e5655daaba8821971825de'
  
  loading: any;
  lineChart: any;

  chartLabels: string[] = [];
  chartData: number[] = [];

  lineChartMethod() {
    if (this.lineChart instanceof Chart) {
      this.lineChart.destroy();
    }

    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'bar',
      data: {
        // Вісь x
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Кількість факультетів',

            // Вісь y
            data: this.chartData,
            backgroundColor: 'darkblue',
          },
        ],
      },
    });
  }

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    Chart.register(...registerables);
  }

  // Вікно попередження
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Помилка',
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async load() {
    this.loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Loading...',
    });

    await this.loading.present();

    // Отримання запиту
    fetch(this.dataUrl)
      .then((res) => res.json())
      .then((json) => {
        let data = json.record;

        try {
          const facultiesArray = data.faculties;

          facultiesArray.forEach((f: Faculty) => {
            this.faculties.addFaculty(f);
          });

          const grouped = this.faculties.group();

          // Дані для графіка
          this.chartLabels = [];
          this.chartData = [];
          for (const university in grouped) {
            this.chartLabels.push(university); 
            this.chartData.push(grouped[university].length);
          }

        } catch (e) {
          this.presentAlert('Помилка читання JSON');
          console.log((e as Error).message);
        }

        this.lineChartMethod();
        this.loading.dismiss();
      });
  }

  ngOnInit() {
    this.load();
  }
}