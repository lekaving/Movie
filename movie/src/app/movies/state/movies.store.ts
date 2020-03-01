import { Injectable, OnDestroy } from '@angular/core';
import { Action, DeepReadonly, ofType, selectState } from '@shared/state/helpers';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { exhaustMap, map, publishReplay, refCount, scan, startWith, takeUntil, tap } from 'rxjs/operators';
import { MovieModel } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { GetPopularMoviesSuccess, MoviesActionEnum } from './movies.actions';
import { reducer } from './movies.reducer';

export interface MoviesState {
  items: MovieModel[];
  loading: boolean;
}

export type ReadOnlyMoviesState = DeepReadonly<MoviesState>;
const defaultState: ReadOnlyMoviesState = {
  items: [],
  loading: false
};

@Injectable({
  providedIn: 'root'
})
export class MoviesStore implements OnDestroy {
  state$: BehaviorSubject<ReadOnlyMoviesState> = new BehaviorSubject<ReadOnlyMoviesState>(defaultState);
  actions$: Subject<Action> = new Subject<Action>();
  private destroy$ = new Subject<void>();

  constructor(
    private moviesService: MoviesService
  ) {
    this.initialStorage();
  }

  private getPopularMovies$: Observable<Action> =
    this.actions$.pipe(
      ofType(MoviesActionEnum.GetPopularMovies),
      exhaustMap(() => this.moviesService.getPopularMovies()),
      map((payload) => new GetPopularMoviesSuccess(payload.results))
    );

  private dispatcher$: Observable<Action> = merge(
    this.actions$,
    this.getPopularMovies$
  );

  stateObs$: Observable<ReadOnlyMoviesState> =
    this.dispatcher$.pipe(
      startWith(defaultState),
      scan(reducer),
      publishReplay(1),
      refCount(),
      tap((some) => {
        console.log('Next State:');
        console.dir(some);
        console.groupEnd();
      }),
    );

  movies$ = this.state$.pipe(selectState('items'));

  initialStorage() {
    this.stateObs$.pipe(takeUntil(this.destroy$)).subscribe(data => this.state$.next(data));
  }

  dispatch(action: Action): void {
    this.actions$.next(action);
  }

  ngOnDestroy(): void {
    this.actions$.next();
    this.actions$.complete();
    this.state$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
