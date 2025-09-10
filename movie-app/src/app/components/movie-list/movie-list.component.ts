import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  searchQuery: string = '';
  loading: boolean = false;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPopularMovies();
  }

  loadPopularMovies(): void {
    this.loading = true;
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });
  }

  searchMovies(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.movieService.searchMovies(this.searchQuery).subscribe({
        next: (response) => {
          this.movies = response.results;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching movies:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadPopularMovies();
    }
  }

  viewMovieDetail(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  getImageUrl(path: string): string {
    return this.movieService.getImageUrl(path);
  }

  getRatingStars(rating: number): string {
    const stars = Math.round(rating / 2); // Convert 10-point scale to 5-point
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  }
}
