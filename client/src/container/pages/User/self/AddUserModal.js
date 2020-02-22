import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const AddUserModal = ({...props}) => {
  
  const { modalVisible } = props;
  const [inputValue, setUserName] = useState('');
  
  const handleAdd = e => {
    e.preventDefault();
    const req = {
      name: inputValue
    }
    props.onAdd(req);
    props.close();
  }

  const handleCancel = e => {
    e.preventDefault();
    props.close();
  }
  
  console.log(inputValue)
  return (
    <Modal
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleAdd}
      closable={false}
      title='Add User'
    >
      <Input
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Input User's Name"
        value={inputValue}
      />
    </Modal>
  )
}

export default AddUserModal;