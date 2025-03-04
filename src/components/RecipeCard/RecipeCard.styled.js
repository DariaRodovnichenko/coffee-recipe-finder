import Modal from "react-modal";
import styled from "styled-components";

/* ✅ Recipe Card Container */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px; /* ✅ Ensures equal height for all cards */
  padding: 16px;
  border-radius: 10px;
  background: #1a1a1a; /* Dark theme */
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(255, 255, 255, 0.2);
  }
`;

/* ✅ Recipe Title */
export const RecipeName = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #ff9d00;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: rgba(
    255,
    255,
    255,
    0.05
  ); /* ✅ Slight transparency for modern look */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 500px; /* ✅ Keeps form compact */
  margin: 0 auto;
`;

export const EditLabel = styled.label`
  font-weight: bold;
  color: white; /* ✅ Adjusted for dark theme */
  margin-bottom: 5px;
  display: block;
`;

export const EditInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #ff9d00;
  }
`;

export const EditTextarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  min-height: 100px; /* ✅ Increased height for better readability */
  resize: vertical;
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #ff9d00; /* ✅ Highlight input on focus */
  }
`;

/* ✅ Metadata Wrapper */
export const MetaWrapper = styled.div`
  font-size: 14px;
  color: #ddd;
  margin-top: 12px;
`;

/* ✅ Modal Styling */
export const CardModal = styled(Modal)`
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  padding: 20px;
  background: #292929; /* Slightly lighter background for contrast */
  border-radius: 10px;
  overflow-y: auto;
  z-index: 99999 !important; /* ✅ Ensure modal stays on top */
  box-shadow: 0px 10px 20px rgba(255, 255, 255, 0.5);
  outline: none;
  color: #f0f0f0;
  position: relative;

  h2 {
    color: #ffc107 !important; /* ✅ Brighter yellow for headings */
  }

  p,
  li,
  strong {
    color: #e0e0e0 !important; /* ✅ Lighter font for readability */
  }
`;

/* ✅ New Wrapper to Ensure Proper Positioning */
export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

/* ✅ Close Button */
export const CloseBtn = styled.button`
  position: absolute !important;
  top: 10px;
  right: 10px; /* ✅ Keeps it in the top-right corner */
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.3s ease;
  font-size: 24px;
  color: white;
  z-index: 10002 !important;

  &:hover {
    color: red;
    transform: scale(1.2);
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

/* ✅ Buttons inside the modal */
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
