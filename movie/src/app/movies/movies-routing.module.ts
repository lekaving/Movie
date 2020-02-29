import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesRootComponent } from './components/movies-root/movies-root.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
