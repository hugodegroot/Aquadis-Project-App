import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourteamComponent } from './yourteam.component';

describe('YourteamComponent', () => {
  let component: YourteamComponent;
  let fixture: ComponentFixture<YourteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
