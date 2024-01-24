import { TestBed, inject } from '@angular/core/testing';

import { DeliveryremainderService } from './deliveryremainder.service';

describe('DeliveryremainderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryremainderService]
    });
  });

  it('should ...', inject([DeliveryremainderService], (service: DeliveryremainderService) => {
    expect(service).toBeTruthy();
  }));
});
