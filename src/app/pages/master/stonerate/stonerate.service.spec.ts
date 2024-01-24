import { TestBed, inject } from '@angular/core/testing';

import { StoneRateService } from './size.service';

describe('StoneRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoneRateService]
    });
  });

  it('should ...', inject([StoneRateService], (service: StoneRateService) => {
    expect(service).toBeTruthy();
  }));
});
