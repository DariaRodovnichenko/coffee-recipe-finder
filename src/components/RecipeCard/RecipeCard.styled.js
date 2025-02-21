import Modal from "react-modal";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px; // Set a minimum height for uniformity
  max-height: 160px; // Optional: Prevent cards from being too tall
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const RecipeName = styled.h2`
  margin-top: 0;
  margin-bottom: 12px;
`;

export const MetaWrapper = styled.div`
  margin-top: 16px;
  flex-grow: 1;
  overflow: hidden;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px;
  margin: 0;
  background-color: transparent;
  border: none;
  border-radius: 90px;
  cursor: pointer;
  transition: color 0.3s ease;

  :hover {
    color: red;
  }

  svg {
    display: block;
    color: navy;
  }
`;

export const CardModal = styled(Modal)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  height: auto; /* Ensures it doesn't get too tall */
  overflow: auto; /* Allows scrolling if content overflows */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  outline: none;
`;
