import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicepagePage } from './servicepage.page';

describe('ServicepagePage', () => {
  let component: ServicepagePage;
  let fixture: ComponentFixture<ServicepagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('помилка якщо xn < -1', () => {
    component.ras('-2', '1', '0.1');
    expect(component.errorXn).toBe('Введіть число від -1 до 1');
  });

  it('помилка якщо xk > 1', () => {
    component.ras('-1', '2', '0.1');
    expect(component.errorXk).toBe('Введіть число від -1 до 1');
  });

  it('помилка якщо h більше діапазону', () => {
    component.ras('-1', '1', '5');
    expect(component.errorH).toBe('Недопустиме значення. Введіть інше значення');
  });

  it('немає помилок при правильних значеннях', () => {
    component.ras('-1', '1', '0.1');
    expect(component.errorXn).toBe('');
    expect(component.errorXk).toBe('');
    expect(component.errorH).toBe('');
  });

  it('масив xx не порожній після розрахунку', () => {
    component.ras('-1', '1', '0.1');
    expect(component.xx.length).toBeGreaterThan(0);
  });

  it('масиви результатів однакової довжини', () => {
    component.ras('-1', '1', '0.1');
    expect(component.yySer.length).toBe(component.xx.length);
    expect(component.yyRec.length).toBe(component.xx.length);
    expect(component.yyTab.length).toBe(component.xx.length);
  });
});