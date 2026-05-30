import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MyHeaderComponent } from "../my-header/my-header.component";
import { ProductListComponent } from '../components/product-list/product-list.component';

@Component({
  selector: 'app-solid',
  templateUrl: './solid.page.html',
  styleUrls: ['./solid.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MyHeaderComponent, ProductListComponent]
})
export class SolidPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
