import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysModalComponent } from './sys-modal.component';

describe('SysModalComponent', () => {
  let component: SysModalComponent;
  let fixture: ComponentFixture<SysModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
