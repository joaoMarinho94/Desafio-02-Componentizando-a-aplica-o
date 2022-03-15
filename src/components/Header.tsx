import { memo } from "react";
import { GenreResponseProps } from "../interfaces";

interface Props {
  selectedGenre: GenreResponseProps;
}

function HeaderComponent({ selectedGenre }: Props) {
  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}

export const Header = memo(HeaderComponent, (prevProps, nextProps) =>
  Object.is(prevProps.selectedGenre.title, nextProps.selectedGenre.title)
);
