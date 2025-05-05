import { TestBed } from '@angular/core/testing';

import { NgxSb4ClientService } from './ngx-sb4-client.service';

describe('NgxSb4ClientService', () => {
  let service: NgxSb4ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSb4ClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
