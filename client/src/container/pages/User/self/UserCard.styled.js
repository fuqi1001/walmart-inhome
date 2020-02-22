import styled from 'styled-components';

export const StyledUserCard = styled.a`
  width: 150px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${({ theme }) => theme.primaryDark};
  border: 0.5px solid #0D0C1D;
  border-radius: 12px;
  cursor: pointer;
  margin: 12px 18px;
  background-color: #fff;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transition: all 0.3s ease-in-out;
  }
  img {
    height: 80px;
    width: 80px;
    border: none;
    border-radius: 12px;
    margin: 15px 35px;
  }
  .center {
    margin: auto auto;
  }
  .block {
    padding: 16px 16px;
    color: ${({ theme }) => theme.primaryDark};
  }
` 