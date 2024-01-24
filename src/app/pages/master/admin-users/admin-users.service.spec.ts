import { TestBed, inject } from '@angular/core/testing';

import { AdminUsersService } from './admin-users.service';

describe('AdminUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminUsersService]
    });
  });

  it('should ...', inject([AdminUsersService], (service: AdminUsersService) => {
    expect(service).toBeTruthy();
  }));
});
