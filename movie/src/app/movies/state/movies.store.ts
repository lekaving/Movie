import { Injectable, OnDestroy } from '@angular/core';
import { Action, DeepReadonly, ofType, selectState } from '@shared/state/helpers';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { exhaustMap, map, publishReplay, refCount, scan, startWith, takeUntil, tap } from 'rxjs/operators';
import { MovieModel } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { GetPopularMovies, GetPopularMoviesSuccess, MoviesActionEnum } from './movies.actions';
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

function Action(some: any) {
  return function (target, propertyKey, descriptor) {
    const actions = target.actions$;
    target.constructor.prototype.decoratorActions = {action: some, propertyKey};
  };
}

function Store(config: any) {
  return function _Store<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor implements OnDestroy {

      private destroy$ = new Subject<void>();

      constructor(...args: any[]) {
        super(...args);
        debugger
        this.stateObs$.pipe(takeUntil(this.destroy$)).subscribe(data => {
          debugger
          return this.state$.next(data);
        });
      }
      actions$: Subject<Action> = new Subject<Action>();

      dispatcher$: Observable<Action>;

      stateObs$: Observable<ReadOnlyMoviesState> =
        this.dispatcher$.pipe(
          // takeUntil(this.destroy$),
          startWith(defaultState),
          scan(reducer),
          publishReplay(1),
          refCount(),
        );

      dispatch(action: Action): void {
        debugger
        if (this.decoratorActions.action.name === action.type) {
          this.dispatcher$ = merge(
            this.actions$,
            this[this.decoratorActions.propertyKey](this.actions$)
          );
        }
        this.actions$.next(action);
      }

      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
    };
  };
}

@Injectable()
@Store({
  state: new BehaviorSubject<ReadOnlyMoviesState>(defaultState)
})
export class MoviesStore {
  state$: BehaviorSubject<ReadOnlyMoviesState> = new BehaviorSubject<ReadOnlyMoviesState>(defaultState);

  constructor(
    private moviesService: MoviesService
  ) {
  }

  @Action(GetPopularMovies)
  getPopularMovies(action) {
    return action.pipe(
      tap(() => {
        debugger
      }),
      ofType(MoviesActionEnum.GetPopularMovies),
      exhaustMap(() => this.moviesService.getPopularMovies()),
      map((payload) => new GetPopularMoviesSuccess(payload.results))
    );
  }

  movies$: Observable<MovieModel[]> = this.state$.pipe(selectState('items'));

}
