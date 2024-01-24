import { TestBed, inject } from '@angular/core/testing';

import { AdminorderService } from './stocktransfer.service';

describe('StockTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockTransferService]
    });
  });

  it('should ...', inject([StockTransferService], (service: StockTransferService) => {
    expect(service).toBeTruthy();
  }));
});
