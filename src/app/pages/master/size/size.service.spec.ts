import { TestBed, inject } from '@angular/core/testing';

import { SizeService } from './size.service';

describe('SizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SizeService]
    });
  });

  it('should ...', inject([SizeService], (service: SizeService) => {
    expect(service).toBeTruthy();
  }));
});
