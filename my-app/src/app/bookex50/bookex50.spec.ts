import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookex50 } from './bookex50';

describe('Bookex50', () => {
  let component: Bookex50;
  let fixture: ComponentFixture<Bookex50>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bookex50]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookex50);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
