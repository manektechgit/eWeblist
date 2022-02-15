import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserFooterComponent } from './login-user-footer.component';

describe('LoginUserFooterComponent', () => {
  let component: LoginUserFooterComponent;
  let fixture: ComponentFixture<LoginUserFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUserFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
