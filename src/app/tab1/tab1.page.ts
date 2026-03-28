import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms'; 
import { MyHeaderComponent } from '../my-header/my-header.component';
import { CalcNumber } from './class/calcNumb';

@Component({
  selector: 'app-tab1',
  standalone: true,
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonIcon, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, MyHeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, FormsModule],
})

export class Tab1Page {
  a: number = 1;
  b: number = 1;
  c: number = 1;
  count: number = 0;

  constructor() {}

  calcNumber() {
    if (this.a == null || this.b == null || this.c == null) {
      this.count = -1; 
      return;
    }
    const calculator = new CalcNumber(this.a, this.b, this.c);
    this.count = calculator.getCount();
    console.log(this.a, this.b, this.c);
  }
}