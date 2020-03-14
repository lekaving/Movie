import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DestroyModulesService {

  modules: {name: string; constructor: any}[] = [];

}
