import { TestBed, inject } from '@angular/core/testing';

import { AdminCustomerService } from './admincustomerorder.service';

describe('AdminCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCustomerService]
    });
  });

  it('should ...', inject([AdminCustomerService], (AdminCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
 