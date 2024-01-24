import { TestBed, inject } from '@angular/core/testing';

import { RejectedbyAdminService } from './rejectedbyadmin.service';

describe('RejectedbyadminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RejectedbyadminService]
    });
  });

  it('should ...', inject([RejectedbyadminService], (service: RejectedbyadminService) => {
    expect(service).toBeTruthy();
  }));
});
