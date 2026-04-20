import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonButtons, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.scss'],
  imports: [IonButtons, IonTitle, IonToolbar, IonHeader, IonButton, IonMenuButton],
})
export class MyHeaderComponent  implements OnInit {
  @Input() name: string = 'Лабораторні роботи';
  constructor() { }

  ngOnInit() {}

}
