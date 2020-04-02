import { Component, OnInit } from '@angular/core';
import { GetPopularMovies } from '../../state/movies.actions';
import { MoviesStore } from '../../state/movies.store';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  constructor(
    private store: MoviesStore
  ) { }

  ngOnInit(): void {
    // this.store.dispatch(new GetPopularMovies());
  }

}
