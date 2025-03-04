import styled from "styled-components";

export const ManageUsersWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
`;

export const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

export const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
`;

export const DeleteBtn = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

export const BackBtn = styled.button`
  background-color: #ff9d00;
  color: black;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff7a00;
    transform: scale(1.05);
  }
`;
