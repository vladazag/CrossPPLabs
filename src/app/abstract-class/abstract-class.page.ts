import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { MyHeaderComponent } from '../my-header/my-header.component';
import { Vehicle } from "../class/Abstract/Vehicle";
import { VehicleFactory } from "./../class/Abstract/VehicleFactory";

@Component({
  selector: 'app-abstract-class',
  templateUrl: './abstract-class.page.html',
  styleUrls: ['./abstract-class.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MyHeaderComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton]
})
export class AbstractClassPage implements OnInit {
  ngOnInit() {
    this.load();
  }

  data: any = [];
  vehicles: Vehicle[] = [];
  dataUrl = 'https://api.jsonbin.io/v3/b/69ea3e8336566621a8e41105';

  async load() {
    this.data = [];
    this.vehicles = [];

    fetch(this.dataUrl)
      .then((res) => res.json())
      .then((json) => {
        this.data = json.record.vehicles;
        let i = 0;
        while (this.data[i] != undefined) {
          this.vehicles.push(VehicleFactory.getVehicle(this.data[i]));
          i++;
        } 
      });
  }

  r: number = 0;
  filteredVehicles: Vehicle[] = [];

  findByRange() {
    this.filteredVehicles = this.vehicles.filter(v => v.getRange() > this.r);
  }

  getMinSpeed(): number {
    return Math.min(...this.vehicles.map(v => v.maxSpeed));
  }

  getMaxSpeed(): number {
    return Math.max(...this.vehicles.map(v => v.maxSpeed));
  }
}
