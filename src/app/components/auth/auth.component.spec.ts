import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../service/auth/auth.service';
import { signal } from '@angular/core';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let authServiceMock: any;

    beforeEach(async () => {
        authServiceMock = {
            isLoggedIn: signal(false),
            currentUser: signal(null),
            login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
            register: jasmine.createSpy('register').and.returnValue(Promise.resolve()),
            logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve())
        };

        await TestBed.configureTestingModule({
            imports: [AuthComponent],
            providers: [
                { provide: AuthService, useValue: authServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('має викликати authService.login при login()', async () => {
        component.email = 'test@test.com';
        component.password = '123456';
        await component.login();
        expect(authServiceMock.login).toHaveBeenCalledWith('test@test.com', '123456');
    });

    it('має викликати authService.register при register()', async () => {
        component.email = 'new@test.com';
        component.password = 'password';
        await component.register();
        expect(authServiceMock.register).toHaveBeenCalledWith('new@test.com', 'password');
    });

    it('має викликати authService.logout при logout()', async () => {
        await component.logout();
        expect(authServiceMock.logout).toHaveBeenCalled();
    });

    it('має показувати помилку при невдалому вході', async () => {
        authServiceMock.login.and.returnValue(Promise.reject(new Error('Invalid credentials')));
        component.email = 'bad@test.com';
        component.password = 'wrong';
        await component.login();
        expect(component.error).toContain('Помилка входу');
    });

    it('має показувати помилку при невдалій реєстрації', async () => {
        authServiceMock.register.and.returnValue(Promise.reject(new Error('Email already in use')));
        component.email = 'existing@test.com';
        component.password = '123456';
        await component.register();
        expect(component.error).toContain('Помилка реєстрації');
    });

    it('має очищувати помилку при повторному вході', async () => {
        authServiceMock.login.and.returnValue(Promise.reject(new Error('fail')));
        await component.login();
        expect(component.error).not.toBe('');

        authServiceMock.login.and.returnValue(Promise.resolve());
        await component.login();
        expect(component.error).toBe('');
    });
});