import { Injectable } from '@angular/core';
import { Films } from './films';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})
export class FilmsService {
  url = `https://swapi.co/api/films/?format=json`
  Films$ = this.http
    .get<Films>(this.url)
    .pipe(map(r => r.results));
  constructor(private http: HttpClient) {}
}
