import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCard, IonInput, IonItem, IonButton, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MyHeaderComponent } from '../my-header/my-header.component';
import { FormsModule } from '@angular/forms'; 
import { CalcRange } from './class/calcRange'; 

@Component({
  selector: 'app-tab2',
  standalone: true,
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonCardContent, IonCardTitle, IonButton, IonItem, IonInput, IonCard, IonCardHeader, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, MyHeaderComponent, FormsModule]
})

export class Tab2Page {
  rangeA: number = 1;
  rangeB: number = 100;
  rangeNumbers: number[] = [];
  rangeSum: number = 0;

  rangeError: boolean = false;

  calcRange() {
    if (this.rangeA == null || this.rangeB == null) {
      this.rangeError = true;
      return;
    }
    this.rangeError = false;
    const calculator = new CalcRange(this.rangeA, this.rangeB);
    this.rangeNumbers = calculator.getNumbers();
    this.rangeSum = calculator.getSum();
  }
}
