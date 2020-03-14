import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestroyModulesService } from '../destroy-modules';
import { SomeComponent } from './some/some.component';

const routes: Routes = [
  {
    path: '',
    component: SomeComponent
  },
];

@NgModule({
  declarations: [SomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SomeModule {
  constructor(private ss: DestroyModulesService, ngRef: NgModuleRef<SomeModule>) {
    ss.modules.push({name: 'SomeModule', constructor: ngRef});
  }
}
