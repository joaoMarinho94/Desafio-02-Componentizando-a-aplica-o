import { useCallback, useEffect, useState } from "react";
import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";
import { GenreResponseProps, MovieProps } from "./interfaces";
import { api } from "./services/api";
import "./styles/global.scss";

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then(({ data }) => {
      setGenres(data);
    });
  }, []);

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

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />

      <Content
        selectedGenre={selectedGenre}
        movies={movies}
        loading={loading}
      />
    </div>
  );
}
