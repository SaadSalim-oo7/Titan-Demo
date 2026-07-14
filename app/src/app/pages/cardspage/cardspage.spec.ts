import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardspage } from './cardspage';

describe('Cardspage', () => {
  let component: Cardspage;
  let fixture: ComponentFixture<Cardspage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cardspage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cardspage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
