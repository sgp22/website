import { TestBed } from '@angular/core/testing';

import { IconLookupService } from './icon-lookup.service';

describe('IconLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IconLookupService = TestBed.get(IconLookupService);
    expect(service).toBeTruthy();
  });
});
