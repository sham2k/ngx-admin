import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPasswdComponent } from './modify-passwd.component';

describe('ModifyPasswdComponent', () => {
  let component: ModifyPasswdComponent;
  let fixture: ComponentFixture<ModifyPasswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPasswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
