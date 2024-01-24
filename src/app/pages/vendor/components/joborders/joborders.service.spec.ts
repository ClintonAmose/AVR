import { TestBed, inject } from '@angular/core/testing';

import { JobordersService } from './joborders.service';

describe('JobordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobordersService]
    });
  });

  it('should ...', inject([JobordersService], (service: JobordersService) => {
    expect(service).toBeTruthy();
  }));
});
