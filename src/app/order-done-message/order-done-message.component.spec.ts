import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDoneMessageComponent } from './order-done-message.component';

describe('OrderDoneMessageComponent', () => {
  let component: OrderDoneMessageComponent;
  let fixture: ComponentFixture<OrderDoneMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDoneMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDoneMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
