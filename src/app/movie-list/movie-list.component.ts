import {Component, OnInit, ViewChild} from '@angular/core';
import {OmdbService} from './omdb.service';
import {Movie} from '../movie-search/movie-search.component';
import {MatTable, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @ViewChild('moviesTable', {static: false}) moviesTable: MatTable<Movie>;
  public movies: Movie[] = [];
  public selection = new SelectionModel<Movie>(true, []);

  public dataSource = JSON.parse(localStorage.getItem('dataSource'));
  public displayedColumns: string[] = ['select', 'Title', 'Year', 'imdbID'];

  constructor(private omdbService: OmdbService) {
  }

  ngOnInit() {
    if (this.dataSource) {
      this.movies = this.dataSource;
    }
  }

  addMovieEventListener(movie: Movie) {
    this.movies.push(movie);
    this.moviesTable.renderRows();
    localStorage.setItem('dataSource', JSON.stringify(this.movies));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.movies.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.movies.forEach(row => this.selection.select(row));
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.movies.findIndex(d => d === item);
      console.log(this.movies.findIndex(d => d === item));
      this.movies.splice(index, 1);

      this.moviesTable.renderRows();
      localStorage.setItem('dataSource', JSON.stringify(this.movies));
    });
    this.selection = new SelectionModel<Movie>(true, []);
  }
}
