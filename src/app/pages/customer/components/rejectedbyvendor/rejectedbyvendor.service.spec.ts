import { TestBed, inject } from '@angular/core/testing';

import { AcceptencePendingService } from './deliveryready.service';

describe('AcceptencePendingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcceptencePendingService]
    });
  });

  it('should ...', inject([AcceptencePendingService], (AcceptencePendingService) => {
    expect(service).toBeTruthy();
  }));
});
