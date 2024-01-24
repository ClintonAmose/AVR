import { TestBed, inject } from '@angular/core/testing';

import { StockManageService } from './stockmanage.service';

describe('StockManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockManageService]
    });
  });

  it('should ...', inject([StockManageService], (service: StockManageService) => {
    expect(service).toBeTruthy();
  }));
});
