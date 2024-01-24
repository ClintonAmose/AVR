import { TestBed, inject } from '@angular/core/testing';

import { TodaydeliveryService } from './deliveryready.service';

describe('TodaydeliveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodaydeliveryService]
    });
  });

  it('should ...', inject([TodaydeliveryService], (service: TodaydeliveryService) => {
    expect(service).toBeTruthy();
  }));
});
