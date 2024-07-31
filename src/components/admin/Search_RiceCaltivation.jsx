import { IoSearch } from "react-icons/io5";
import PropTypes from 'prop-types'

const Search_RiceCaltivation = ({searchRiceCaltivation, setSearchRiceCaltivation}) => {
  return (
    <div>
      <div className="border border-gray-300 rounded-lg flex items-center">
        <div className="w-full p-3 bg-gray-100 rounded-l-lg text-gray-500 border-r">
          <IoSearch />
        </div>
        <input
          type="number"
          name="searchRiceCaltivation"
          id="searchRiceCaltivation"
          value={searchRiceCaltivation}
          onChange={(e) => setSearchRiceCaltivation(e.target.value)}
          placeholder="รหัสรอบการปลูก"
          className="h-full rounded-r-lg p-2 text-sm bg-gray-50"
        />
      </div>
    </div>
  );
};

Search_RiceCaltivation.propTypes = {
    searchRiceCaltivation: PropTypes.string,
    setSearchRiceCaltivation: PropTypes.func
}

export default Search_RiceCaltivation;
