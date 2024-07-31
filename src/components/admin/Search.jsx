import { IoSearch } from "react-icons/io5";
import PropTypes from "prop-types";

const Search = ({ setSearch }) => {
  return (
    <div className="relative w-full md:w-1/4">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500">
        <IoSearch />
      </div>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ps-10 p-2.5"
        required
        placeholder="ระบุชื่อชาวนา"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

Search.propTypes = {
  setSearch: PropTypes.func,
  text: PropTypes.string,
  page: PropTypes.string,
  setRiceCaltivation_id_Search: PropTypes.func,
};

export default Search;
