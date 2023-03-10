import { GetServerSideProps, NextPage } from "next";

import { wrapper } from "@/redux/store";
import { CardList } from "@/components/CardList/CardList";
import { Searchbar } from "@/components/Searchbar/Searchbar";
import { serverSideFunction } from "@/utils/serverSideFunctions/searchPage";
import { SearchPageHeading } from "@/components/SearchPageHeading/SearchPageHeading";

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
  wrapper.getServerSideProps(
    (store) => (ctx) => serverSideFunction({ ctx, store })
  );

export default Search;
