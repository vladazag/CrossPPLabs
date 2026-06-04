import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton, IonList, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { CategoryService, Category } from '../../service/category/category.service';
import { ProductService } from '../../service/product/product.service';

@Component({
    selector: 'app-category-manager',
    standalone: true,
    imports: [FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton, IonList, IonLabel],
    template: `
        <ion-card>
            <ion-card-header>
                <ion-card-title>Управління категоріями</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <ion-item>
                    <ion-input label="Нова категорія" [(ngModel)]="newCategoryName"></ion-input>
                </ion-item>
                <ion-button (click)="addCategory()">Додати категорію</ion-button>

                @if (error) {
                <p style="color:red">{{ error }}</p>
                }

                <ion-list>
                    @for (cat of categoryService.categories(); track cat.id) {
                    <ion-item>
                        @if (editingId === cat.id) {
                        <ion-input [(ngModel)]="editingName"></ion-input>
                        <ion-button (click)="saveEdit(cat.id)">Зберегти</ion-button>
                        <ion-button fill="outline" (click)="cancelEdit()">Скасувати</ion-button>
                        } @else {
                        <ion-label>{{ cat.name }}</ion-label>
                        <ion-button (click)="startEdit(cat)">Редагувати</ion-button>
                        <ion-button color="danger" (click)="deleteCategory(cat)">Видалити</ion-button>
                        }
                    </ion-item>
                    }
                </ion-list>
            </ion-card-content>
        </ion-card>
    `
})
export class CategoryManagerComponent implements OnInit {
    newCategoryName = '';
    editingId: string | null = null;
    editingName = '';
    error = '';

    constructor(
        public categoryService: CategoryService,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.categoryService.load();
    }

    async addCategory() {
        if (!this.newCategoryName.trim()) {
            this.error = 'Назва категорії не може бути порожньою';
            return;
        }
        this.error = '';
        await this.categoryService.addCategory(this.newCategoryName.trim());
        this.newCategoryName = '';
    }

    startEdit(cat: Category) {
        this.editingId = cat.id;
        this.editingName = cat.name;
    }

    async saveEdit(id: string) {
        if (!this.editingName.trim()) {
            this.error = 'Назва категорії не може бути порожньою';
            return;
        }
        this.error = '';
        await this.categoryService.updateCategory(id, this.editingName.trim());
        this.editingId = null;
        this.editingName = '';
    }

    cancelEdit() {
        this.editingId = null;
        this.editingName = '';
    }

    async deleteCategory(cat: Category) {
        const confirmed = confirm(
            `Ви впевнені? При видаленні категорії "${cat.name}" будуть видалені всі пов'язані продукти.`
        );
        if (!confirmed) return;

        await this.productService.deleteProductsByCategory(cat.name);
        await this.categoryService.deleteCategory(cat.id);
    }
}