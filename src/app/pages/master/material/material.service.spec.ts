import { TestBed, inject } from '@angular/core/testing';

import { MaterialService } from './material.service';

describe('MaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialService]
    });
  });

  it('should ...', inject([MaterialService], (service: MaterialService) => {
    expect(service).toBeTruthy();
  }));
});
