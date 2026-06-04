import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../../service/auth/auth.service';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton],
    template: `
        @if (!authService.isLoggedIn()) {
        <ion-card>
            <ion-card-header>
                <ion-card-title>Авторизація</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-item>
                    <ion-input label="Email" type="email" [(ngModel)]="email"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input label="Пароль" type="password" [(ngModel)]="password"></ion-input>
                </ion-item>
                @if (error) {
                <p style="color:red">{{ error }}</p>
                }
                <ion-button (click)="login()">Увійти</ion-button>
                <ion-button fill="outline" (click)="register()">Зареєструватись</ion-button>
            </ion-card-content>
        </ion-card>
        } @else {
        <ion-card>
            <ion-card-content>
                <p>Ви увійшли як: {{ authService.currentUser()?.email }}</p>
                <ion-button color="medium" (click)="logout()">Вийти</ion-button>
            </ion-card-content>
        </ion-card>
        }
    `
})
export class AuthComponent {
    email = '';
    password = '';
    error = '';

    constructor(public authService: AuthService) {}

    async login() {
        try {
            this.error = '';
            await this.authService.login(this.email, this.password);
        } catch (e: any) {
            this.error = 'Помилка входу: ' + e.message;
        }
    }

    async register() {
        try {
            this.error = '';
            await this.authService.register(this.email, this.password);
        } catch (e: any) {
            this.error = 'Помилка реєстрації: ' + e.message;
        }
    }

    async logout() {
        await this.authService.logout();
    }
}