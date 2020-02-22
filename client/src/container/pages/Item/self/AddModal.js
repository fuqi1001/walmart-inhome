import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const AddModal = ({...props}) => {
  
  const [itemName, setItemName] = useState('');
  const { modalVisible, onAdd } = props;
  
  const handleCancel = e => {
    e.preventDefault();
    props.close();
  };
  const handleAdd = e => {
    e.preventDefault();
    const reqBody = {
      name: itemName
    }
    onAdd(reqBody);
    props.close();
  }

  return (
    <Modal
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleAdd}
      closable={false}
    >
      <Input
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Input the item name"
        value={itemName}
      />
    </Modal>
  )
}

export default AddModal;