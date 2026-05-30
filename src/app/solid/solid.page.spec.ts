import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolidPage } from './solid.page';

describe('SolidPage', () => {
  let component: SolidPage;
  let fixture: ComponentFixture<SolidPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
