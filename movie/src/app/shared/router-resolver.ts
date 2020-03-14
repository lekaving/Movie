import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DestroyModulesService } from '../destroy-modules';

@Injectable()
export class HnResolver implements Resolve<Observable<string>> {
  constructor(private destroy: DestroyModulesService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) {
    if (state.url === '/some') {
      const mod = this.destroy.modules.find(module => module.name === 'MoviesModule');
      mod.constructor.destroy()
    }
    return of('');
  }
}
