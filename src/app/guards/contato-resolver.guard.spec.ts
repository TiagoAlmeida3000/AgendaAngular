import { TestBed } from '@angular/core/testing';

import { ContatoResolverGuard } from './contato-resolver.guard';

describe('ContatoResolverGuard', () => {
  let guard: ContatoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContatoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
