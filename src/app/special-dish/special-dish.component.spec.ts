import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDishComponent } from './special-dish.component';

describe('SpecialDishComponent', () => {
  let component: SpecialDishComponent;
  let fixture: ComponentFixture<SpecialDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialDishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
