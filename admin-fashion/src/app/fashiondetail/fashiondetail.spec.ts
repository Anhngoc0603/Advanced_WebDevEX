import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fashiondetail } from './fashiondetail';

describe('Fashiondetail', () => {
  let component: Fashiondetail;
  let fixture: ComponentFixture<Fashiondetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fashiondetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fashiondetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
