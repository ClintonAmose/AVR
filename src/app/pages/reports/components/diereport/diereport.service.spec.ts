import { TestBed, inject } from '@angular/core/testing';

import { VenorderstatusService } from './venorderstatus.service';

describe('VenorderstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenorderstatusService]
    });
  });

  it('should ...', inject([VenorderstatusService], (service: VenorderstatusService) => {
    expect(service).toBeTruthy();
  }));
});
