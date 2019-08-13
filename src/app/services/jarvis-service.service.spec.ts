import { TestBed } from '@angular/core/testing';

import { JarvisServiceService } from './jarvis-service.service';

describe('JarvisServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JarvisServiceService = TestBed.get(JarvisServiceService);
    expect(service).toBeTruthy();
  });
});
