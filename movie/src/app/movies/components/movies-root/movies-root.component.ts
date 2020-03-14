import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../../models/movie.model';
import { GetPopularMovies } from '../../state/movies.actions';
import { MoviesStore } from '../../state/movies.store';

@Component({
  selector: 'app-movies-root',
  templateUrl: './movies-root.component.html',
  styleUrls: ['./movies-root.component.scss']
})
export class MoviesRootComponent implements OnInit {
  movies$: Observable<MovieModel[]> = this.store.movies$;

  constructor(
    private store: MoviesStore
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPopularMovies());
  }

}
