import styled from "styled-components";

export const ManageUsers = styled.div`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

export const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
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