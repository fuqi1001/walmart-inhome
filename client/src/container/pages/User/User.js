import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './User.scss';
import UserCard from './self/UserCard';
import { StyledUserCard } from './self/UserCard.styled';
import AddUserModal from './self/AddUserModal';

export default function User() {
  const [userList, setUserList] = useState([]);
  const [addModalVisible, setModalVisible] = useState(false);
  
  async function fetchUserList() {
    try {
      const response = await axios.get('/api/user/list');
      const data = response.data.data;
      setUserList(data);
    } catch (err){
      window.alert(err);
    }
  }
  useEffect(() => { fetchUserList() }, []);

  async function addItem(req) {
    try {
      const response = await axios.post('/api/user', req);
      const data = response.data.data;
      setUserList(data);
    } catch (err) {
      window.alert(err)
    }   
  }

  
  return (
    <div className="user">
      <div className="user-inner">
        {
          userList ? userList.map(user => (
            <UserCard user={user} key={user.id}/>
          )) : null
        }
        <StyledUserCard onClick={() => setModalVisible(true)}>
          <img alt="ava" src="https://img.icons8.com/wired/64/000000/add--v2.png" className="center"/>
        </StyledUserCard>
      </div>
      <AddUserModal
        modalVisible={addModalVisible}
        close={() => setModalVisible(false)}
        onAdd={addItem} 
      />
    </div>
  )
  
}