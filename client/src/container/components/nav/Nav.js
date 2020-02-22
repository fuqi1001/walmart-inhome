import React from 'react';
import { StyledNav } from './Nav.styled'; 
import { Link } from 'react-router-dom';

const Nav = ({ ...props }) => {
  return (
    <StyledNav {...props}>
      <Link to="/user">
        <span role="img" aria-hidden="true">😋</span>
        Users
      </Link>
      <Link to="/order">
        <span role="img" aria-hidden="true">🛒</span>
        Orders
      </Link>
      <Link to="/item">
        <span role="img" aria-hidden="true">🥦</span>
        Items
      </Link>
    </StyledNav>
  )
}

export default Nav;