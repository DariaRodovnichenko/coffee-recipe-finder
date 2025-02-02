export const SearchBar = ({
  year,
  method,
  onChangeYear,
  onChangeMethod,
  onReset,
  onSearch, // Add onSearch prop to handle search
}) => {
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    onSearch(); // Call the onSearch handler when the button is clicked
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={method}
          onChange={(e) => {
            onChangeMethod(e.target.value);
          }}
          placeholder="Recipe Finder"
        />
        <select
          value={year}
          onChange={(e) => {
            onChangeYear(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
};
