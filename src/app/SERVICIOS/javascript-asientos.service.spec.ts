import { TestBed } from '@angular/core/testing';

import { JavascriptAsientosService } from './javascript-asientos.service';

describe('JavascriptAsientosService', () => {
  let service: JavascriptAsientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JavascriptAsientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
