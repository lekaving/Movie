import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HnResolver } from '@shared/router-resolver';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
    resolve: { message: HnResolver }
  },
  {
    path: 'some',
    loadChildren: () => import('./some/some.module').then(m => m.SomeModule),
    resolve: { message: HnResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
