import { TestBed, inject } from '@angular/core/testing';

import { ItemtypeService } from './itemtype.service';

describe('ItemtypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemtypeService]
    });
  });

  it('should ...', inject([ItemtypeService], (service: ItemtypeService) => {
    expect(service).toBeTruthy();
  }));
});
