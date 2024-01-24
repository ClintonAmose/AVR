import { TestBed, inject } from '@angular/core/testing';

import { CustomerrequestService } from './customerrequest.service';

describe('CustomerrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerrequestService]
    });
  });

  it('should ...', inject([CustomerrequestService], (service: CustomerrequestService) => {
    expect(service).toBeTruthy();
  }));
});
