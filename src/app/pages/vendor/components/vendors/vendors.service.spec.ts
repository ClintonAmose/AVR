import { TestBed, inject } from '@angular/core/testing';

import { VendorsService } from './vendors.service';

describe('VendorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorsService]
    });
  });

  it('should ...', inject([VendorsService], (service: VendorsService) => {
    expect(service).toBeTruthy();
  }));
});