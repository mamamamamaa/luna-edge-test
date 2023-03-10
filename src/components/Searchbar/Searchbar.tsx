import { FormEvent } from "react";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";

import style from "./Searchbar.module.css";

export const Searchbar = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = String(formData.get("query"));

    router.push(`/search?searchQuery=${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="default-search" className={style.label}>
        Search
      </label>
      <div className="relative">
        <div className={style.iconContainer}>
          <BsSearch size={20} className="text-gray-500" />
        </div>
        <input
          name="query"
          type="search"
          id="default-search"
          className={style.searchInput}
          placeholder="Search Films, Series..."
          required
        />
        <button type="submit" className={style.submitButton}>
          Search
        </button>
      </div>
    </form>
  );
};
