import { useQueryParams } from "../../hooks/useQueryParams.js";
import { MethodFilter } from "../MethodFilter.js";
import { YearFilter } from "../YearFilter.js";

export const SearchBar = ({ onSearch }) => {
  const { resetFilters } = useQueryParams();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    onSearch(); // Call the onSearch handler when the button is clicked
  };

  return (
    <div>
      <MethodFilter />
      <YearFilter />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      <button type="button" onClick={resetFilters}>
        Reset filters
      </button>
    </div>
  );
};
