import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {OmdbService} from '../movie-list/omdb.service';
import {FormControl} from '@angular/forms';
import {debounceTime, map, retryWhen} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {Observable} from 'rxjs';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  public searchResults: Movie[];
  public searchTerm: FormControl;
  @Output() addMovieEventEmitter = new EventEmitter<Movie>();

  constructor(private omdbService: OmdbService) {
    this.searchTerm = new FormControl();
    this.searchTerm.patchValue('');
  }

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap(searchTerm => this.omdbService.getList(searchTerm))
      )
      .subscribe(
        (data: any) => {
          this.searchResults = data.Search;
        });
  }

  addMovie(imdbID) {
    let movie = this.searchResults.find(function(movie) {
      return movie.imdbID === imdbID;
    });

    this.addMovieEventEmitter.emit(movie);
  }
}
