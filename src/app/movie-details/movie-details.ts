export class MovieDetails {
  public title;
  public year;
  public imdbID;
  public plot;
  public poster;

  constructor(title, year, imdbID, plot, poster) {
    this.title = title;
    this.year = year;
    this.imdbID = imdbID;
    this.plot = plot;
    this.poster = poster;
  }
}
