import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { DestroyModulesService } from '../destroy-modules';
import { MoviesRootComponent } from './components/movies-root/movies-root.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesStore } from './state/movies.store';
import { MoreComponent } from './components/more/more.component';
import { RootComponent } from './components/root/root.component';


@NgModule({
  declarations: [MoviesRootComponent, MoreComponent, RootComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule {

  constructor(private ss: DestroyModulesService, ngRef: NgModuleRef<MoviesModule>) {
    this.ss.modules.push({name: 'MoviesModule', constructor: ngRef});
  }

}
