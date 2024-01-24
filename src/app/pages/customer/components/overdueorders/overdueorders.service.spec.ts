import { TestBed, inject } from '@angular/core/testing';

import { OverdueordersService } from './overdueorders.service';

describe('OverdueordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverdueordersService]
    });
  });

  it('should ...', inject([OverdueordersService], (service: OverdueordersService) => {
    expect(service).toBeTruthy();
  }));
});
