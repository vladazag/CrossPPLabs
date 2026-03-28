import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonCardContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { MyHeaderComponent } from '../my-header/my-header.component';
import { FormsModule } from '@angular/forms'; 
import { CalcMatrix } from './class/calcMatrix'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, MyHeaderComponent, FormsModule, IonGrid, IonRow, IonCol],
})
export class Tab3Page {
  n: number = 3;
  matrix: number[][] = [];
  rowSums: number[] = [];

  matrixError: boolean = false;

  calcMatrix() {
    if (this.n == null) {
      this.matrixError = true;
      return;
    }
    const calculator = new CalcMatrix(this.n);
    this.matrix = calculator.getMatrix();
    this.rowSums = calculator.getRowSums();
  }
}
