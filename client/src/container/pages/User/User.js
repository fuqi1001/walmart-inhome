import React, { Component, Provider } from 'react';
import axios from 'axios'
import './User.scss';
import { Fragment } from 'react';
import UserCard from './self/UserCard';
import { StyledUserCard } from './self/UserCard.styled';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/user/list');
      const data = response.data.data;
      this.setState({
        userList: data,
      })
    } catch (err){
      window.alert(err);
    }
  }

  render() {
    const { userList } = this.state;
    console.log(userList)
    return (
      <div className="user">
        <div className="user-inner">
          {
            userList ? userList.map(user => (
              <UserCard user={user} key={user.id}/>
            )) : null
          }
          <StyledUserCard>
            <img src="https://img.icons8.com/wired/64/000000/add--v2.png" class="center"/>
          </StyledUserCard>
        </div>
        
      </div>
    )
  }
}

export default User;