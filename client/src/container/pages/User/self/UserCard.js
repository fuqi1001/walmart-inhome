import React from 'react';
import { Link } from 'react-router-dom';
import { StyledUserCard } from './UserCard.styled';
import ava from '../../../../assets/img/ava.png';

const UserCard = ({ ...props }) => {
  const { user } = props;
  return (
    <StyledUserCard>
      <img src={ava}/>
      <div className="block">
        <div>User #: {user.id}</div>
        <div>Name: {user.name}</div>
      </div>
    </StyledUserCard>
  )
}

export default UserCard;