import { useEffect, useState } from "react";
import { GenreResponseProps } from "../interfaces";

import { api } from "../services/api";

import "../styles/sidebar.scss";

import { Button } from "./Button";
import Logo from "./Logo";

interface Props {
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

export function SideBar({ selectedGenreId, handleClickButton }: Props) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then(({ data }) => {
      setGenres(data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <Logo/>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
