import { API_KEY } from './config';
export const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=fr&sort_by=popularity.desc`;
export const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

  // recherche
export const getMovieSearch = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&query=${query}`
  return(
    await fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
  )
}

//default movie search page
export const getDefaultMovie = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr&page=1`
  return(
    await fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
  )
} 

// accueil movie
export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );

  return movies;
};
