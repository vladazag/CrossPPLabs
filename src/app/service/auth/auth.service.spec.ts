import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';

describe('AuthService testing', () => {
    let service: AuthService;

    beforeEach(() => {
        const authMock = {
            onAuthStateChanged: () => () => {}
        };

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: Auth, useValue: authMock }
            ]
        });
        service = TestBed.inject(AuthService);
    });

    it('має створюватись', () => {
        expect(service).toBeTruthy();
    });

    it('має бути не авторизованим на початку', () => {
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('currentUser має бути null на початку', () => {
        expect(service.currentUser()).toBeNull();
    });
});