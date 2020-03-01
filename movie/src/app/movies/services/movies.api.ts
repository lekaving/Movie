export class MoviesApi {
  private readonly url = 'movie';

  popularMovies(): string {
    return `${this.url}/popular`;
  }
}
