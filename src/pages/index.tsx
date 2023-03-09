import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-2">Welcome to My Movie Site</h1>
        <p className="text-lg">Discover the latest and greatest movies here.</p>
      </section>
    </>
  );
};

export default Home;
