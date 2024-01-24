import { TestBed, inject } from '@angular/core/testing';

import { ClarityService } from './clarity.service';

describe('ClarityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClarityService]
    });
  });

  it('should ...', inject([ClarityService], (service: ClarityService) => {
    expect(service).toBeTruthy();
  }));
});
