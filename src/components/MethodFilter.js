import { useQueryParams } from "../hooks/useQueryParams.js"

export const MethodFilter = () => {
  const { method, changeMethod } = useQueryParams();

  return (
    <input
      type="text"
      value={method}
      onChange={(evt) => changeMethod(evt.target.value)}
      placeholder="Method of brewing"
    />
  );
};
