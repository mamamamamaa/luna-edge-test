import { FC } from "react";
import { FilmCard } from "@/components/FilmCard/FilmCard";
import { Searchbar } from "@/components/Searchbar/Searchbar";
import { SearchPageHeading } from "@/components/SearchPageHeading/SearchPageHeading";

const Search: FC = () => {
  return (
    <div className="flex flex-col gap-14">
      <SearchPageHeading />
      <Searchbar />
      <FilmCard />
    </div>
  );
};

export default Search;
