export const SearchBar = ({
  difficulty,
  method,
  onChangeDifficulty,
  onChangeMethod,
}) => {
  return (
    <div>
      <input
        type="text"
        value={method}
        onChange={(e) => {
          onChangeMethod(e.target.value);
        }}
        placeholder="Recipe Finder"
      />
      <select
        value={difficulty}
        onChange={(e) => {
          onChangeDifficulty(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="button">Search</button>
    </div>
  );
};
