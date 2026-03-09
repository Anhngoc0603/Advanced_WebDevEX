import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginex61 } from './loginex61';

describe('Loginex61', () => {
  let component: Loginex61;
  let fixture: ComponentFixture<Loginex61>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Loginex61]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginex61);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
