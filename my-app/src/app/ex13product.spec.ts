import { TestBed } from '@angular/core/testing';

import { Ex13product } from './ex13product';

describe('Ex13product', () => {
  let service: Ex13product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex13product);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
