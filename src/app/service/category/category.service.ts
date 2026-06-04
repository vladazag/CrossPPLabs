import { Injectable, signal, inject } from '@angular/core';
import { Database, ref, onValue, push, update, remove } from '@angular/fire/database';

export interface Category {
    id: string;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private db = inject(Database);
    categories = signal<Category[]>([]);

    load(): void {
        const categoriesRef = ref(this.db, 'categories');
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                this.categories.set([]);
                return;
            }
            const list: Category[] = [];
            Object.keys(data).forEach(key => {
                list.push({ id: key, name: data[key].name });
            });
            this.categories.set(list);
        });
    }

    async addCategory(name: string): Promise<void> {
        const categoriesRef = ref(this.db, 'categories');
        await push(categoriesRef, { name });
    }

    async updateCategory(id: string, name: string): Promise<void> {
        const categoryRef = ref(this.db, `categories/${id}`);
        await update(categoryRef, { name });
    }

    async deleteCategory(id: string): Promise<void> {
        const categoryRef = ref(this.db, `categories/${id}`);
        await remove(categoryRef);
    }

    getCategoryNames(): string[] {
        return this.categories().map(c => c.name);
    }
}