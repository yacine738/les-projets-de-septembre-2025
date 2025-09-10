import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie, MovieResponse } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'your-api-key-here'; // Replace with your TMDB API key
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  // Sample movies data for demo purposes (remove when using real API)
  private sampleMovies: Movie[] = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      backdrop_path: '/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg',
      release_date: '1994-09-23',
      vote_average: 8.7,
      vote_count: 8358,
      genre_ids: [18, 80],
      adult: false,
      original_language: 'en',
      original_title: 'The Shawshank Redemption',
      popularity: 6.741296,
      video: false
    },
    {
      id: 2,
      title: 'The Godfather',
      overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
      release_date: '1972-03-14',
      vote_average: 8.6,
      vote_count: 6024,
      genre_ids: [18, 80],
      adult: false,
      original_language: 'en',
      original_title: 'The Godfather',
      popularity: 6.073017,
      video: false
    },
    {
      id: 3,
      title: 'The Dark Knight',
      overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg',
      release_date: '2008-07-16',
      vote_average: 8.4,
      vote_count: 9106,
      genre_ids: [18, 28, 80, 53],
      adult: false,
      original_language: 'en',
      original_title: 'The Dark Knight',
      popularity: 10.681351,
      video: false
    },
    {
      id: 4,
      title: 'Inception',
      overview: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
      release_date: '2010-07-16',
      vote_average: 8.3,
      vote_count: 32000,
      genre_ids: [28, 12, 878],
      adult: false,
      original_language: 'en',
      original_title: 'Inception',
      popularity: 30.5,
      video: false
    },
    {
      id: 5,
      title: 'Fight Club',
      overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
      poster_path: '/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg',
      backdrop_path: '/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg',
      release_date: '1999-10-15',
      vote_average: 8.4,
      vote_count: 24000,
      genre_ids: [18],
      adult: false,
      original_language: 'en',
      original_title: 'Fight Club',
      popularity: 28.2,
      video: false
    },
    {
      id: 6,
      title: 'Pulp Fiction',
      overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in tales of violence and redemption.',
      poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      backdrop_path: '/wPU78OPnBnYgqYZJf1OG2P46AVU.jpg',
      release_date: '1994-10-14',
      vote_average: 8.5,
      vote_count: 23000,
      genre_ids: [80, 53],
      adult: false,
      original_language: 'en',
      original_title: 'Pulp Fiction',
      popularity: 27.9,
      video: false
    },
    {
      id: 7,
      title: 'Forrest Gump',
      overview: 'The presidencies of Kennedy and Johnson, the Vietnam War, and more through the eyes of an Alabama man with a low IQ.',
      poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      backdrop_path: '/wMgbnUVS9wbRGAdki8fqxKU1O0N.jpg',
      release_date: '1994-07-06',
      vote_average: 8.5,
      vote_count: 22000,
      genre_ids: [35, 18, 10749],
      adult: false,
      original_language: 'en',
      original_title: 'Forrest Gump',
      popularity: 26.4,
      video: false
    },
    {
      id: 8,
      title: 'Interstellar',
      overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      backdrop_path: '/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
      release_date: '2014-11-07',
      vote_average: 8.3,
      vote_count: 30000,
      genre_ids: [12, 18, 878],
      adult: false,
      original_language: 'en',
      original_title: 'Interstellar',
      popularity: 32.1,
      video: false
    },
    {
      id: 9,
      title: 'The Matrix',
      overview: 'A hacker learns about the true nature of reality and his role in the war against its controllers.',
      poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      backdrop_path: '/7u3pxc0K1wx32IleAkLv78MKgrw.jpg',
      release_date: '1999-03-31',
      vote_average: 8.1,
      vote_count: 22000,
      genre_ids: [28, 878],
      adult: false,
      original_language: 'en',
      original_title: 'The Matrix',
      popularity: 29.7,
      video: false
    },
    {
      id: 10,
      title: 'Parasite',
      overview: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
      poster_path: '/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      backdrop_path: '/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg',
      release_date: '2019-05-30',
      vote_average: 8.5,
      vote_count: 17000,
      genre_ids: [35, 18, 53],
      adult: false,
      original_language: 'ko',
      original_title: '기생충',
      popularity: 31.0,
      video: false
    },
    {
      id: 11,
      title: 'Avengers: Endgame',
      overview: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance.',
      poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      backdrop_path: '/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
      release_date: '2019-04-26',
      vote_average: 8.3,
      vote_count: 25000,
      genre_ids: [12, 28, 878],
      adult: false,
      original_language: 'en',
      original_title: 'Avengers: Endgame',
      popularity: 60.2,
      video: false
    },
    {
      id: 12,
      title: 'Spirited Away',
      overview: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.',
      poster_path: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
      backdrop_path: '/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg',
      release_date: '2001-07-20',
      vote_average: 8.5,
      vote_count: 14000,
      genre_ids: [16, 14, 10751],
      adult: false,
      original_language: 'ja',
      original_title: '千と千尋の神隠し',
      popularity: 23.4,
      video: false
    },
    {
      id: 13,
      title: 'City of God',
      overview: 'In the slums of Rio, two kids\' paths diverge as one struggles to become a photographer and the other a kingpin.',
      poster_path: '/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg',
      backdrop_path: '/sLfjaFUb6K5xQ3ZHL9WfG0uKfP2.jpg',
      release_date: '2002-08-30',
      vote_average: 8.3,
      vote_count: 9000,
      genre_ids: [18, 80],
      adult: false,
      original_language: 'pt',
      original_title: 'Cidade de Deus',
      popularity: 18.7,
      video: false
    },
    {
      id: 14,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      overview: 'A meek Hobbit and eight companions set out on a journey to destroy the One Ring and the Dark Lord Sauron.',
      poster_path: '/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
      backdrop_path: '/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg',
      release_date: '2001-12-19',
      vote_average: 8.4,
      vote_count: 23000,
      genre_ids: [12, 14, 28],
      adult: false,
      original_language: 'en',
      original_title: 'The Lord of the Rings: The Fellowship of the Ring',
      popularity: 35.0,
      video: false
    },
    {
      id: 15,
      title: 'The Green Mile',
      overview: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
      poster_path: '/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
      backdrop_path: '/o0lO84GI7qrG6XFvtsPOSV7CTNa.jpg',
      release_date: '1999-12-10',
      vote_average: 8.5,
      vote_count: 14000,
      genre_ids: [14, 18, 80],
      adult: false,
      original_language: 'en',
      original_title: 'The Green Mile',
      popularity: 21.9,
      video: false
    },
    {
      id: 16,
      title: 'Spider-Man: Into the Spider-Verse',
      overview: 'Teen Miles Morales becomes Spider-Man and must join other Spider-People from across the multiverse to stop a threat.',
      poster_path: '/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      backdrop_path: '/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg',
      release_date: '2018-12-14',
      vote_average: 8.4,
      vote_count: 18000,
      genre_ids: [16, 28, 12],
      adult: false,
      original_language: 'en',
      original_title: 'Spider-Man: Into the Spider-Verse',
      popularity: 45.3,
      video: false
    },
    {
      id: 17,
      title: 'Goodfellas',
      overview: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.',
      poster_path: '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
      backdrop_path: '/sw7mordbZxgITU877yTpZCud90M.jpg',
      release_date: '1990-09-21',
      vote_average: 8.5,
      vote_count: 11000,
      genre_ids: [18, 80],
      adult: false,
      original_language: 'en',
      original_title: 'Goodfellas',
      popularity: 19.2,
      video: false
    },
    {
      id: 18,
      title: 'Seven Samurai',
      overview: 'A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.',
      poster_path: '/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg',
      backdrop_path: '/sJNNMCc6B7KZIY3LH3JMYJJNH5j.jpg',
      release_date: '1954-04-26',
      vote_average: 8.6,
      vote_count: 6500,
      genre_ids: [28, 18],
      adult: false,
      original_language: 'ja',
      original_title: '七人の侍',
      popularity: 12.7,
      video: false
    },
    {
      id: 19,
      title: 'Toy Story',
      overview: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.',
      poster_path: '/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
      backdrop_path: '/yDjMM9ap5rKxEvZ9GGfTy4sflFU.jpg',
      release_date: '1995-11-22',
      vote_average: 8.0,
      vote_count: 16000,
      genre_ids: [16, 35, 10751],
      adult: false,
      original_language: 'en',
      original_title: 'Toy Story',
      popularity: 32.6,
      video: false
    },
    {
      id: 20,
      title: 'Titanic',
      overview: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
      poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      backdrop_path: '/yDI6D5ZQh67YU4r2ms8qcSbAviZ.jpg',
      release_date: '1997-12-19',
      vote_average: 7.9,
      vote_count: 23000,
      genre_ids: [18, 10749],
      adult: false,
      original_language: 'en',
      original_title: 'Titanic',
      popularity: 52.1,
      video: false
    },
    {
      id: 21,
      title: 'Life is Beautiful',
      overview: 'A Jewish-Italian man uses his imagination to shield his son from the horrors of life in a Nazi concentration camp.',
      poster_path: '/6FsGeIp7heHm5eh0tIxTzHIhgI9.jpg',
      backdrop_path: '/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg',
      release_date: '1997-12-20',
      vote_average: 8.5,
      vote_count: 12000,
      genre_ids: [35, 18],
      adult: false,
      original_language: 'it',
      original_title: 'La vita è bella',
      popularity: 15.8,
      video: false
    },
    {
      id: 22,
      title: 'Casablanca',
      overview: 'A cynical nightclub owner protects an old flame and her husband from Nazis in Morocco.',
      poster_path: '/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg',
      backdrop_path: '/oKTMZFIgTJOJ5lvAeY7DvXbk5G1.jpg',
      release_date: '1942-11-26',
      vote_average: 8.5,
      vote_count: 5500,
      genre_ids: [18, 10749],
      adult: false,
      original_language: 'en',
      original_title: 'Casablanca',
      popularity: 18.9,
      video: false
    },
    {
      id: 23,
      title: 'Mad Max: Fury Road',
      overview: 'In a post-apocalyptic wasteland, Max teams up with a mysterious woman to try to survive.',
      poster_path: '/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
      backdrop_path: '/phxiKFDvPeQj4AbkvJLmuZEieDU.jpg',
      release_date: '2015-05-15',
      vote_average: 8.1,
      vote_count: 22000,
      genre_ids: [28, 12, 878],
      adult: false,
      original_language: 'en',
      original_title: 'Mad Max: Fury Road',
      popularity: 38.4,
      video: false
    },
    {
      id: 24,
      title: 'Your Name',
      overview: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies.',
      poster_path: '/q719jXXEzOoYaps6babgKnONONX.jpg',
      backdrop_path: '/7prYzufdIOy1KCTZKVWpjBFqqNr.jpg',
      release_date: '2016-08-26',
      vote_average: 8.2,
      vote_count: 9000,
      genre_ids: [16, 18, 10749],
      adult: false,
      original_language: 'ja',
      original_title: '君の名は。',
      popularity: 24.1,
      video: false
    },
    {
      id: 25,
      title: 'The Grand Budapest Hotel',
      overview: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.',
      poster_path: '/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
      backdrop_path: '/nPxaJOBIDSoY8COfIkEZOjdEhyF.jpg',
      release_date: '2014-03-28',
      vote_average: 8.1,
      vote_count: 11000,
      genre_ids: [35, 18],
      adult: false,
      original_language: 'en',
      original_title: 'The Grand Budapest Hotel',
      popularity: 22.3,
      video: false
    },
    {
      id: 26,
      title: 'Whiplash',
      overview: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams are mentored by an instructor who will stop at nothing.',
      poster_path: '/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
      backdrop_path: '/4H1XuFN3OhWhGJvgqwsB6HiGwt.jpg',
      release_date: '2014-10-10',
      vote_average: 8.5,
      vote_count: 14000,
      genre_ids: [18],
      adult: false,
      original_language: 'en',
      original_title: 'Whiplash',
      popularity: 27.8,
      video: false
    },
    {
      id: 27,
      title: 'The Pianist',
      overview: 'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto during World War II.',
      poster_path: '/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg',
      backdrop_path: '/pWHf4khOloNVfCxAm7WKSyov6x2.jpg',
      release_date: '2002-09-25',
      vote_average: 8.5,
      vote_count: 8500,
      genre_ids: [18, 10752],
      adult: false,
      original_language: 'en',
      original_title: 'The Pianist',
      popularity: 16.4,
      video: false
    },
    {
      id: 28,
      title: 'Gladiator',
      overview: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.',
      poster_path: '/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
      backdrop_path: '/ehGIBK4NALcspXXX2wgSfqSJhv8.jpg',
      release_date: '2000-05-05',
      vote_average: 8.2,
      vote_count: 19000,
      genre_ids: [28, 18, 12],
      adult: false,
      original_language: 'en',
      original_title: 'Gladiator',
      popularity: 41.7,
      video: false
    },
    {
      id: 29,
      title: 'Amélie',
      overview: 'Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her.',
      poster_path: '/nSxDa3M9aMvGVLoItzWTfNqBow.jpg',
      backdrop_path: '/5LxtdY3Y9x4wQyOJu5VVbYJiDfr.jpg',
      release_date: '2001-04-25',
      vote_average: 8.3,
      vote_count: 8000,
      genre_ids: [35, 18],
      adult: false,
      original_language: 'fr',
      original_title: 'Le fabuleux destin d\'Amélie Poulain',
      popularity: 20.1,
      video: false
    },
    {
      id: 30,
      title: 'Dune',
      overview: 'Paul Atreides leads nomadic tribes in a revolt against the galactic emperor and his father\'s evil nemesis.',
      poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      backdrop_path: '/iopYFB1b6Bh7FWZh3onQhph1sih.jpg',
      release_date: '2021-10-22',
      vote_average: 8.0,
      vote_count: 13000,
      genre_ids: [12, 18, 878],
      adult: false,
      original_language: 'en',
      original_title: 'Dune',
      popularity: 55.2,
      video: false
    }
  ];

  constructor(private http: HttpClient) { }

  // Get popular movies (using sample data for demo)
  getPopularMovies(): Observable<MovieResponse> {
    // For demo purposes, return sample data
    // Replace with real API call: return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
    return of({
      page: 1,
      results: this.sampleMovies,
      total_results: this.sampleMovies.length,
      total_pages: 1
    });
  }

  // Get movie by ID
  getMovie(id: number): Observable<Movie | undefined> {
    // For demo purposes, find in sample data
    // Replace with real API call: return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
    const movie = this.sampleMovies.find(m => m.id === id);
    return of(movie);
  }

  // Search movies
  searchMovies(query: string): Observable<MovieResponse> {
    // For demo purposes, filter sample data
    // Replace with real API call: return this.http.get<MovieResponse>(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`);
    const filteredMovies = this.sampleMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
    return of({
      page: 1,
      results: filteredMovies,
      total_results: filteredMovies.length,
      total_pages: 1
    });
  }

  // Get full image URL
  getImageUrl(path: string): string {
    return `${this.imageBaseUrl}${path}`;
  }
}
