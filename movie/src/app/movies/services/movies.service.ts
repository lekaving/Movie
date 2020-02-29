import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel, Paging } from '../models/movie.model';
import { MoviesApi } from './movies.api';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly urls = new MoviesApi();

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getPopularMovies(): Observable<Paging<MovieModel>> {
    return this.http.get<Paging<MovieModel>>(this.urls.popularMovies());
  }
}
