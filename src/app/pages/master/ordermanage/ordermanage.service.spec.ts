import { TestBed, inject } from '@angular/core/testing';

import { OrderManageService } from './ordermanage.service';

describe('OrderManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderManageService]
    });
  });

  it('should ...', inject([OrderManageService], (service: OrderManageService) => {
    expect(service).toBeTruthy();
  }));
});
