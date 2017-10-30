import { TestBed, inject } from '@angular/core/testing';

import { DisplayGlobalNavService } from './display-global-nav.service';

describe('DisplayGlobalNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayGlobalNavService]
    });
  });

  it('should be created', inject([DisplayGlobalNavService], (service: DisplayGlobalNavService) => {
    expect(service).toBeTruthy();
  }));
});
