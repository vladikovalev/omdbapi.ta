import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OmdbService} from '../movie-list/omdb.service';
import {MovieDetails} from './movie-details';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public details: MovieDetails;
  public imdbID: string;

  constructor(private route: ActivatedRoute,
              private omdbService: OmdbService) {
  }

  ngOnInit() {
    this.imdbID = this.route.snapshot.params.id;
    this.omdbService.getDetails(this.imdbID).subscribe(data => {
      this.details = new MovieDetails(data.Title, data.Year, data.imdbID, data.Plot, data.Poster);
    });
  }

}
