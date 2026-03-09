import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoindeskAPI } from './coindesk-api';

describe('CoindeskAPI', () => {
  let component: CoindeskAPI;
  let fixture: ComponentFixture<CoindeskAPI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoindeskAPI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoindeskAPI);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
