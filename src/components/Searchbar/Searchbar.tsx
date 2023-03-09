import { BsSearch } from "react-icons/bs";

import style from "./Searchbar.module.css";

export const Searchbar = () => {
  return (
    <form>
      <label htmlFor="default-search" className={style.label}>
        Search
      </label>
      <div className="relative">
        <div className={style.iconContainer}>
          <BsSearch size={20} className="text-gray-500" />
        </div>
        <input
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
