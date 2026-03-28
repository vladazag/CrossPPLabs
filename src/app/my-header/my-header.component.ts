import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-my-header',
  templateUrl: './my-header.component.html',
  styleUrls: ['./my-header.component.scss'],
  imports: [IonTitle, IonToolbar, IonHeader],
})
export class MyHeaderComponent  implements OnInit {
  @Input() name: string = 'Лабораторні роботи';
  constructor() { }

  ngOnInit() {}

}
