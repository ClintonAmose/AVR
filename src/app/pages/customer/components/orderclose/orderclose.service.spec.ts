import { TestBed, inject } from '@angular/core/testing';

import { OrdercloseService } from './orderclose.service';

describe('OrdercloseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdercloseService]
    });
  });

  it('should ...', inject([OrdercloseService], (service: OrdercloseService) => {
    expect(service).toBeTruthy();
  }));
});
