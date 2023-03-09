import { FC } from "react";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { Searchbar } from "@/components/Searchbar/Searchbar";

const Search: FC = () => {
  return (
    <>
      <Searchbar />
      <FilmCard />
      <FilmCard />
      <FilmCard />
    </>
  );
};

export default Search;
