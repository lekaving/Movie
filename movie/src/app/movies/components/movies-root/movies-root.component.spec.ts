import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRootComponent } from './movies-root.component';

describe('MoviesRootComponent', () => {
  let component: MoviesRootComponent;
  let fixture: ComponentFixture<MoviesRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
