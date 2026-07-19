import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstate } from './real-estate';

describe('RealEstate', () => {
  let component: RealEstate;
  let fixture: ComponentFixture<RealEstate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
