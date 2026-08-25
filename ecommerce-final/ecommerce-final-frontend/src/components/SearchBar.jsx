import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  if (!showSearch) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center py-4">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search pieces..."
          className="flex-1 outline-none bg-inherit text-sm"
          autoFocus
        />
        <img src={assets.search_icon} className="w-4" alt="" />
      </div>
      <img
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
        src={assets.cross_icon}
        className="inline w-4 ml-4 cursor-pointer"
        alt="close search"
      />
    </div>
  );
};

export default SearchBar;
