import { MoviesActionEnum, MoviesActions } from './movies.actions';
import { ReadOnlyMoviesState } from './movies.store';

export const reducer = (state, action: MoviesActions): ReadOnlyMoviesState => {
  switch (action.type) {
    case MoviesActionEnum.GetPopularMoviesSuccess:
      return {...state, items: action.payload};
    default:
      return state;
  }
};
