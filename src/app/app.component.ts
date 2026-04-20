import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonItem, IonList, IonTitle, IonToolbar, IonApp, IonRouterOutlet, IonMenu, IonHeader, IonContent, IonMenuToggle],
})
export class AppComponent {
  constructor() {}
}
