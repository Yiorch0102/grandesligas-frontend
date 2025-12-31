import { TestBed } from '@angular/core/testing';

import { Entrenador } from './entrenador';

describe('Entrenador', () => {
  let service: Entrenador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Entrenador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
