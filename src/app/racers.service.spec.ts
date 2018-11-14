import { TestBed } from '@angular/core/testing';

import { RacersService } from './racers.service';

describe('RacersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RacersService = TestBed.get(RacersService);
    expect(service).toBeTruthy();
  });
});
