import { useQueryParams } from "../../hooks/useQueryParams.js"
import { FilterInput, FilterWrapper } from "./Filters.styled.js";

export const MethodFilter = () => {
  const { method, changeMethod } = useQueryParams();

  return (
    <FilterWrapper>
      <FilterInput
        type="text"
        value={method}
        onChange={(evt) => changeMethod(evt.target.value)}
        placeholder="Method of brewing"
      />
    </FilterWrapper>
  );
};
