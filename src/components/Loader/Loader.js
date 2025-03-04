import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Oval height={60} width={60} color="#ff9d00" secondaryColor="#ddd" />
    </LoaderWrapper>
  );
};
