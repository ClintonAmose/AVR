import { TestBed, inject } from '@angular/core/testing';

import { DieService } from './die.service';

describe('DieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DieService]
    });
  });

  it('should ...', inject([DieService], (service: DieService) => {
    expect(service).toBeTruthy();
  }));
});
