import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fashionlist } from './fashionlist';

describe('Fashionlist', () => {
  let component: Fashionlist;
  let fixture: ComponentFixture<Fashionlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Fashionlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fashionlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
