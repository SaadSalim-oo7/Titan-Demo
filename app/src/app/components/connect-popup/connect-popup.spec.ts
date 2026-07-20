import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectPopup } from './connect-popup';

describe('ConnectPopup', () => {
  let component: ConnectPopup;
  let fixture: ComponentFixture<ConnectPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
