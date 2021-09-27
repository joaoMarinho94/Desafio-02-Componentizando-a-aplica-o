import { GenreResponseProps } from "../interfaces";

interface Props {
  selectedGenre: GenreResponseProps;
}

export function Header({ selectedGenre }: Props) {
  return (
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>
  );
}
