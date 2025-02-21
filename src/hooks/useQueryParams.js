import { useSearchParams } from "react-router-dom";

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const method = searchParams.get("method") ?? "";
  const year = searchParams.get("year") ?? "all";

  const changeMethod = (newMethod) => {
    searchParams.set("method", newMethod);
    setSearchParams(searchParams);
  };

  const changeYear = (newYear) => {
    searchParams.set("year", newYear);
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchParams({
      method: "",
      year: "all",
    });
  };

  return {
    method,
    year,
    changeMethod,
    changeYear,
    resetFilters,
  };
};
