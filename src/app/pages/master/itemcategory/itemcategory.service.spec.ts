import { TestBed, inject } from '@angular/core/testing';

import { ItemcategoryService } from './itemcategory.service';

describe('ItemcategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemcategoryService]
    });
  });

  it('should ...', inject([ItemcategoryService], (service: ItemcategoryService) => {
    expect(service).toBeTruthy();
  }));
});
