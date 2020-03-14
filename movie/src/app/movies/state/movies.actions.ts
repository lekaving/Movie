import { Action } from '@shared/state/helpers';
import { MovieModel } from '../models/movie.model';

export class GetPopularMovies implements Action {
  readonly type = MoviesActionEnum.GetPopularMovies;
}

export class GetPopularMoviesSuccess implements Action {
  readonly type = MoviesActionEnum.GetPopularMoviesSuccess;

  // constructor(public payload: MovieModel[]) {
  constructor(public payload: any) {
  }
}

export enum MoviesActionEnum {
  GetPopularMovies = 'GetPopularMovies',
  GetPopularMoviesSuccess = 'GetPopularMoviesSuccess'
}

export type MoviesActions = GetPopularMovies
  | GetPopularMoviesSuccess;
