import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    currentUser = signal<User | null>(null);
    isLoggedIn = signal<boolean>(false);

    constructor() {
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser.set(user);
            this.isLoggedIn.set(!!user);
        });
    }

    async register(email: string, password: string): Promise<void> {
        await createUserWithEmailAndPassword(this.auth, email, password);
    }

    async login(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(this.auth, email, password);
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
    }
}