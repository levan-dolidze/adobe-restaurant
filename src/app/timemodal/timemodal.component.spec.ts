import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimemodalComponent } from './timemodal.component';

describe('TimemodalComponent', () => {
  let component: TimemodalComponent;
  let fixture: ComponentFixture<TimemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimemodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
