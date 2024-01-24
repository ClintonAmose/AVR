import { TestBed, inject } from '@angular/core/testing';

import { CustomerdeliveryService } from './customerdelivery.service';

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
