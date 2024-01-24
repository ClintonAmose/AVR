import { TestBed, inject } from '@angular/core/testing';

import { AdminorderService } from './adminorder.service';

describe('AdminorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminorderService]
    });
  });

  it('should ...', inject([AdminorderService], (service: AdminorderService) => {
    expect(service).toBeTruthy();
  }));
});
