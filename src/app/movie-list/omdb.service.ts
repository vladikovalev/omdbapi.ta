import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) {
    // this.getJSON().subscribe(data => {
    //   console.log(data);
    // });
  }

  public getList(searchTerm): Observable<any> {
    return this.http.get(`http://www.omdbapi.com/?apikey=21f8843b&s=${searchTerm}&plot=full`);
  }

  public getDetails(imdbID): Observable<any> {
    return this.http.get(`http://www.omdbapi.com/?apikey=21f8843b&i=${imdbID}&plot=full`);
    // return this.http.get('./assets/movie-details.json');
  }
}
