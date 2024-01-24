import { TestBed, inject } from '@angular/core/testing';

import { DealerService } from './dealer.service';

describe('DealerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealerService]
    });
  });

  it('should ...', inject([DealerService], (service: DealerService) => {
    expect(service).toBeTruthy();
  }));
});
