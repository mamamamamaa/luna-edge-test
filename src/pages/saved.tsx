import { NextPage } from "next";

import { useFilms } from "@/redux/hooks";
import { List } from "@/components/List/List";

const Saved: NextPage = () => {
  const { savedFilms } = useFilms();

  return (
    <>
      <List films={savedFilms} />
    </>
  );
};

export default Saved;
