import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fashionform } from './fashionform';

describe('Fashionform', () => {
  let component: Fashionform;
  let fixture: ComponentFixture<Fashionform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fashionform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fashionform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
