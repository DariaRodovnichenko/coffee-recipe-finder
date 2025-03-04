import { useQueryParams } from "../../hooks/useQueryParams.js";
import { MethodFilter } from "../Filters/MethodFilter.js";
import { YearFilter } from "../Filters/YearFilter.js";
import { SearchBtn, SearchContainer } from "./SearchBar.styled.js";

export const SearchBar = ({ onSearch }) => {
  const { resetFilters } = useQueryParams();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    onSearch(); // Call the onSearch handler when the button is clicked
  };

  return (
    <SearchContainer>
      <MethodFilter />
      <YearFilter />
      <SearchBtn type="button" onClick={handleSearch}>
        Search
      </SearchBtn>
      <SearchBtn type="button" onClick={resetFilters}>
        Reset filters
      </SearchBtn>
    </SearchContainer>
  );
};
