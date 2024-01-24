import { TestBed, inject } from '@angular/core/testing';

import { WorkinProcessService } from './deliveryready.service';

describe('WorkinProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkinProcessService]
    });
  });

  it('should ...', inject([WorkinProcessService], (WorkinProcessService) => {
    expect(service).toBeTruthy();
  }));
});
