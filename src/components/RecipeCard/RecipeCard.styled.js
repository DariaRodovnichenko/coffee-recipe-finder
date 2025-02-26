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
  max-height: 90vh; /* Ensures the modal does not exceed viewport height */
  overflow-y: auto; /* Allows scrolling if content overflows */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  outline: none;

  /* Ensure smooth scrolling behavior */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa; /* Light gray background for clarity */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const EditLabel = styled.label`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

export const EditInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #007bff; /* Highlight input on focus */
  }
`;

export const EditTextarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
  }
`;

export const EditBtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const SaveBtn = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export const CancelBtn = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;
