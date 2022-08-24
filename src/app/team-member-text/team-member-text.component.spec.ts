import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberTextComponent } from './team-member-text.component';

describe('TeamMemberTextComponent', () => {
  let component: TeamMemberTextComponent;
  let fixture: ComponentFixture<TeamMemberTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamMemberTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
