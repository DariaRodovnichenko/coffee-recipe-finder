import { useQueryParams } from "../hooks/useQueryParams.js";

export const YearFilter = () => {
    const { year, changeYear } = useQueryParams();
    return (
      <select
        value={year}
        onChange={(e) => {
          changeYear(e.target.value);
        }}
      >
        <option value="all">Year</option>
        {/* <option value="2027">2027</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option> */}
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
      </select>
    );    
}