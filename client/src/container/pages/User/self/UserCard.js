import React from 'react';
import { StyledUserCard } from './UserCard.styled';
import ava from '../../../../assets/img/ava.png';

const UserCard = ({ ...props }) => {
  const { user } = props;
  return (
    <StyledUserCard>
      <img alt='ava' src={ava}/>
      <div className="block">
        <div>User #: {user.id}</div>
        <div>Name: {user.name}</div>
      </div>
    </StyledUserCard>
  )
}

export default UserCard;