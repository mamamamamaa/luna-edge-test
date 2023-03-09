import Head from "next/head";
import { GetServerSideProps } from "next";
import { wrapper } from "@/redux/store";
import { setError, setFilms } from "@/redux/slices/films";
import { getFilms } from "@/utils/api";

export default function Home() {
  return (
    <>
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-2">Welcome to My Movie Site</h1>
        <p className="text-lg">Discover the latest and greatest movies here.</p>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      // const films = await getFilms();
      // store.dispatch(setFilms(films));
      return { props: {} };
    } catch (err) {
      if (err instanceof Error) {
        store.dispatch(setError(err.message));
      }
      return { props: {} };
    }
  });
