import React, { useState, useEffect } from 'react';
import { Modal, Select, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
const { Option } = Select;

const AddOrderModal = ({...props}) => {
  
  const { modalVisible, onAdd } = props;
  const [itemList, setItemList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedUser, setSelectUser] = useState('');

  async function fetchItemList() {
    try {
      const response = await axios.get('/api/item/list');
      const data = response.data.data;
      setItemList(data);
    } catch (err) {
      window.alert(err);
    }
  }

  async function fetchUserList() {
    try {
      const response = await axios.get('/api/user/list');
      const data = response.data.data;
      setUserList(data);
    } catch (err) {
      window.alert(err);
    }
  }

  useEffect(() => { fetchItemList() }, []);
  useEffect(() => { fetchUserList() }, []);

  const option = itemList.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  });

  const handleCancel = e => {
    e.preventDefault();
    props.close();
  };

  const handleAdd = e => {
    e.preventDefault();
    const user_id = selectedUser;
    const items = checkedItems;
    const reqBody = {
      user_id,
      items,
    }

    props.add(reqBody);
    props.close();
  }

  return (
    <Modal
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleAdd}
      closable={false}
      title='Add New Item'
    >
      <Select style={{ width: 120 }} onChange={(val) => setSelectUser(val)} style={{ width: '100%', marginBottom: '24px' }}  placeholder="Select an User">
        {userList.map(user => (<Option value={user.id} key={user.id}>{user.name}</Option>))}
      </Select>
      <div>
        <Checkbox.Group 
          onChange={(checkedValues) => setCheckedItems(checkedValues)} 
        >
          <Row>
            {
              option.map(item => (
                <Col  span={8} key={item.value}>
                  <Checkbox value={item.value}>
                    {item.label}
                  </Checkbox>
                </Col>
              ))
            }
          </Row>
        </Checkbox.Group>
      </div>
    </Modal>
  )
}

export default AddOrderModal;