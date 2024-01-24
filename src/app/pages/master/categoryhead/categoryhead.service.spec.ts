import { TestBed, inject } from '@angular/core/testing';

import { CategoryheadService } from './categoryhead.service';

describe('CategoryheadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryheadService]
    });
  });

  it('should ...', inject([CategoryheadService], (service: CategoryheadService) => {
    expect(service).toBeTruthy();
  }));
});
