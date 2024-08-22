import { TestBed } from '@angular/core/testing';

import { ThingSpeakService } from './thingspeak.service';

describe('ThingspeakService', () => {
  let service: ThingSpeakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThingSpeakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
