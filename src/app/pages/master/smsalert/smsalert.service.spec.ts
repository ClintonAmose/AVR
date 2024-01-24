import { TestBed, inject } from '@angular/core/testing';

import { SmsalertService } from './smsalert.service';

describe('SmsalertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsalertService]
    });
  });

  it('should ...', inject([SmsalertService], (service: SmsalertService) => {
    expect(service).toBeTruthy();
  }));
});
