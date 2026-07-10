import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScroll } from './horizontal-scroll';

describe('HorizontalScroll', () => {
  let component: HorizontalScroll;
  let fixture: ComponentFixture<HorizontalScroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalScroll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalScroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
