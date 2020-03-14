import * as t from 'runtypes';

const some = t.Record({
  poster_path: t.String,
  adult: t.Boolean,
  overview: t.String,
  release_date: t.String,
  genre_ids: t.Array(t.Number),
  id: t.Number,
  original_title: t.String,
  original_language: t.String,
  title: t.Boolean,
  backdrop_path: t.String,
  popularity: t.Number,
  vote_count: t.Number,
  video: t.Boolean,
  vote_average: t.Number,
});

export type some = t.Static<typeof some>;

export interface MovieModel {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Paging<T> {
  page: number;
  results: T[];
  total_results: number;
  total_pages: number;
}
