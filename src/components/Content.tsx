import { useEffect, useState } from "react";

import { MovieCard } from "./MovieCard";

import "../styles/content.scss";
import { api } from "../services/api";
import { Header } from "./Header";
import { GenreResponseProps, MovieProps } from "../interfaces";

interface Props {
  selectedGenreId: number;
}

export function Content({ selectedGenreId }: Props) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    setLoading(true);
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(({ data }) => {
        setMovies(data);
      })
      .finally(() => setLoading(false));

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then(({ data }) => {
        setSelectedGenre(data);
      });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header selectedGenre={selectedGenre} />

      {loading && (
        <div className="loading">
          <img src='https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif' width='30' alt="loading" />
        </div>
      )}

      {!loading && (
        <main>
          <div className="movies-list">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                runtime={movie.Runtime}
                rating={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
