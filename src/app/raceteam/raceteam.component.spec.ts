import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceteamComponent } from './raceteam.component';

describe('RaceteamComponent', () => {
  let component: RaceteamComponent;
  let fixture: ComponentFixture<RaceteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
