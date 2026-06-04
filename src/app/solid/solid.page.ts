import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { MyHeaderComponent } from "../components/my-header/my-header.component";
import { ProductListComponent } from '../components/product-list/product-list.component';
import { AuthComponent } from '../components/auth/auth.component';
import { CategoryManagerComponent } from '../components/category-manager/category-manager.component';
import { AuthService } from '../service/auth/auth.service';

@Component({
    selector: 'app-solid',
    templateUrl: './solid.page.html',
    styleUrls: ['./solid.page.scss'],
    standalone: true,
    imports: [IonContent, CommonModule, FormsModule, MyHeaderComponent, ProductListComponent, AuthComponent, CategoryManagerComponent]
})
export class SolidPage {
    constructor(public authService: AuthService) {}
}