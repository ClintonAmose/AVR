import { TestBed, inject } from '@angular/core/testing';

import { VendorApprovestatusService } from './vendororderstatus.service';

describe('VendorApprovestatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendorApprovestatusService]
    });
  });

  it('should ...', inject([VendorApprovestatusService], (service: VendorApprovestatusService) => {
    expect(service).toBeTruthy();
  }));
});
