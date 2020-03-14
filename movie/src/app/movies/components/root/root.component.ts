import { Component, OnInit } from '@angular/core';
import { MoviesStore } from '../../state/movies.store';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
