export interface Film {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface ResponseFilms {
  Search: Film[];
  totalResults: string;
  Response: string;
}
