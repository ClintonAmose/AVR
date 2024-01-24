import { TestBed, inject } from '@angular/core/testing';

import { CustomerorderService } from './customerorder.service';

describe('CustomerorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerorderService]
    });
  });

  it('should ...', inject([CustomerorderService], (service: CustomerorderService) => {
    expect(service).toBeTruthy();
  }));
});
