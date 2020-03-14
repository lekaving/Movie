import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

export function ofType<T extends Action>(type: string): MonoTypeOperatorFunction<T> {
  return filter((_) => type === _.type);
}

export function hasEditedObjectValue(previous: unknown, current: unknown) {
  if (Array.isArray(previous) && Array.isArray(current)) {
    return JSON.stringify(previous) === JSON.stringify(current);
  } else if (typeof previous === 'object' && typeof current === 'object') {
    return Object.keys(current).reduce((acc, key) => {
      if (current[key] !== previous[key]) {
        acc = false;
      }
      return acc;
    }, true);
  } else {
    return previous === current;
  }
}
// TODO lekaving: DeepReadonly<S> incoming coz properties define like DeepReadonly.
export function selectState<T, R>(stateName: string): OperatorFunction<DeepReadonly<T>, R> {
  return input$ => input$.pipe(
    map(state => state[stateName]),
    filter(state => state !== null),
    distinctUntilChanged((previous, current) => hasEditedObjectValue(previous, current))
  );
}

type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonlyObject<T[K]> };
export type DeepReadonly<T> = T extends Array<infer E> ?
  ReadonlyArray<DeepReadonlyObject<E>> :
  T extends object ? DeepReadonlyObject<T> :
    T;


export interface Action {
  type: string;
}
