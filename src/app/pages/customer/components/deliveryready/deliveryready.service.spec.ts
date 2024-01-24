import { TestBed, inject } from '@angular/core/testing';

import { CustomerdeliveryService } from './deliveryready.service';

describe('CustomerdeliveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerdeliveryService]
    });
  });

  it('should ...', inject([CustomerdeliveryService], (service: CustomerdeliveryService) => {
    expect(service).toBeTruthy();
  }));
});
