import { GenreResponseProps } from "../interfaces";
import "../styles/sidebar.scss";
import { Button } from "./Button";
import Logo from "./Logo";

interface Props {
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
  genres: GenreResponseProps[];
}

export function SideBar({ selectedGenreId, handleClickButton, genres }: Props) {
  return (
    <nav className="sidebar">
      <Logo />

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
