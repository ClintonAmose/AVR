import { TestBed, inject } from '@angular/core/testing';

import { CatelogStockService } from './catalogstock.service';

describe('CatalogStockComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogStockComponent]
    });
  });

  it('should ...', inject([CatalogStockComponent], (CatalogStockComponent) => {
    expect(service).toBeTruthy();
  }));
});
