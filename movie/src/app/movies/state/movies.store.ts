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


function SomeDecorator(config: any): ClassDecorator {
  console.log('-- decorator function invoked --');
  // tslint:disable-next-line:only-arrow-functions
  return function(constructor: any) {
    console.log('-- decorator invoked --');
    const LIFECYCLE_HOOKS = [
      'ngOnInit',
      'ngOnChanges',
      'ngOnDestroy'
    ];
    const component = constructor.name;
    const ngOnDestroy = constructor.prototype['ngOnDestroy'];
    LIFECYCLE_HOOKS.forEach(hook => {
      const original = constructor.prototype[hook];

      constructor.prototype[hook] = function (...args) {
        console.log(`%c ${component} - ${hook}`, `color: #4CAF50; font-weight: bold`, ...args);
        original && original.apply(this, args);
      };
    });
  };
}

@Injectable()
@SomeDecorator({})
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
      takeUntil(this.destroy$),
      startWith(defaultState),
      scan(reducer),
      publishReplay(1),
      refCount(),
    );

  movies$: Observable<MovieModel[]> = this.state$.pipe(selectState('items'));

  // movies: MovieModel[] = this.state$.getValue().items;

  initialStorage() {
    this.stateObs$.pipe(takeUntil(this.destroy$)).subscribe(data => this.state$.next(data));
  }

  dispatch(action: Action): void {
    this.actions$.next(action);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.actions$.next();
    this.actions$.complete();
    this.state$.complete();
  }
}
