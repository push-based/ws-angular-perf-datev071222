import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  concat,
  exhaustMap,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { TMDBMovieModel } from '../../shared/model/movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.scss'],
})
export class MovieListPageComponent implements OnInit {
  movies: TMDBMovieModel[] = [];

  readonly paginate$ = new Subject<boolean>();

  readonly movies$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      if (params['category']) {
        return this.paginate((page) =>
          this.movieService.getMovieList(params['category'], page)
        ).pipe(
          tap((movies) => {
            this.movies = movies;
          })
        );
      } else {
        return this.paginate((page) =>
          this.movieService.getMoviesByGenre(params['id'], page)
        ).pipe(
          tap((movies) => {
            this.movies = movies;
          })
        );
      }
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  private paginate(
    requestFn: (page: string) => Observable<TMDBMovieModel[]>
  ): Observable<TMDBMovieModel[]> {
    return concat(
      requestFn('1'),
      this.paginate$.pipe(
        filter(Boolean),
        exhaustMap((v, i) =>
          requestFn(`${i + 2}`).pipe(
            map((movies) => [...this.movies, ...movies])
          )
        )
      )
    ).pipe(/*shareReplay(10)*/);
  }
}
