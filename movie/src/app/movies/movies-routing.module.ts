import { NgModule, OnDestroy } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreComponent } from './components/more/more.component';
import { MoviesRootComponent } from './components/movies-root/movies-root.component';
import { RootComponent } from './components/root/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent
  },
  {
    path: 'movies',
    component: MoviesRootComponent
  },
  {
    path: 'more',
    component: MoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule implements OnDestroy{
  ngOnDestroy(): void {
    debugger
  }
}
