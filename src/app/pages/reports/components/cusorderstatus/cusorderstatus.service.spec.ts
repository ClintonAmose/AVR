import { TestBed, inject } from '@angular/core/testing';

import { CusorderstatusService } from './cusorderstatus.service';

describe('CusorderstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CusorderstatusService]
    });
  });

  it('should ...', inject([CusorderstatusService], (service: CusorderstatusService) => {
    expect(service).toBeTruthy();
  }));
});
