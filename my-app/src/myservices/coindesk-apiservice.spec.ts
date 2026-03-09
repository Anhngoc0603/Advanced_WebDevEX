import { TestBed } from '@angular/core/testing';

import { CoindeskAPIService } from './coindesk-apiservice';

describe('CoindeskAPIService', () => {
  let service: CoindeskAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoindeskAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
