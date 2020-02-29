import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-root',
  templateUrl: './movies-root.component.html',
  styleUrls: ['./movies-root.component.scss']
})
export class MoviesRootComponent implements OnInit {

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.moviesService.getPopularMovies();
  }

}
