import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoviesRootComponent } from './components/movies-root/movies-root.component';
import { MoviesRoutingModule } from './movies-routing.module';


@NgModule({
  declarations: [MoviesRootComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule {

  constructor() {
  }

}
