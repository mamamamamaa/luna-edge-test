import { Searchbar } from "@/components/Searchbar/Searchbar";
import { SearchPageHeading } from "@/components/SearchPageHeading/SearchPageHeading";
import { GetServerSideProps, NextPage } from "next";
import { wrapper } from "@/redux/store";
import { getFilms } from "@/utils/api";
import { setError, setFilms } from "@/redux/slices/films";
import { CardList } from "@/components/CardList/CardList";

const Search: NextPage = () => {
  return (
    <div className="flex flex-col gap-14">
      <SearchPageHeading />
      <Searchbar />
      <CardList />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { films: state } = store.getState();
      const { query, data } = state;

      if (data.length !== 0) {
        return { props: {} };
      }

      const films = await getFilms(query);
      store.dispatch(setFilms(films));

      return { props: {} };
    } catch (err) {
      if (err instanceof Error) {
        store.dispatch(setError(err.message));
      }

      return { props: {} };
    }
  });

export default Search;
