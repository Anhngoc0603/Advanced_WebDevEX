import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mathematics } from './mathematics';

describe('Mathematics', () => {
  let component: Mathematics;
  let fixture: ComponentFixture<Mathematics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Mathematics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mathematics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
