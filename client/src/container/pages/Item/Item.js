import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Item.scss';
import { Table, Button, Icon } from 'antd';
import AddModal from './self/AddModal';

export default function Item() {

  const [modalVisible, setVisible] = useState(false);
  const [itemList, setItemList] = useState([]);

  async function fetchItemList() {
    try {
      const response = await axios.get('/api/item/list');
      const data = response.data.data;
      setItemList(data);
    } catch (err){
      window.alert(err);
    }
  }

  async function addItem(req) {
    try {
      const response = await axios.post('/api/item', req);
      if (!response.data.ok) {
        window.alert(response.data.message);
        return;  
      }
      const data = response.data.data;
      setItemList(data);
    } catch (err) {
      window.alert(err);
    }
  }

  useEffect(() => { fetchItemList() }, [])

  const columns = [
    {
      title: 'Item ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: 'Item Name',
      dataIndex: 'name',
      width: 200,
    },
  ];
  return (
    <div className="item">
      <div className="item-inner">
        <Button type="primary" className="btn-add" size='large' onClick={() => setVisible(true)}>
          <Icon type="plus" />
        </Button>
        <Table
          columns={columns}
          dataSource={itemList}
          rowKey="id"
          pagination={{ pageSize: 15 }}
        />
      </div>
      <AddModal 
        modalVisible={modalVisible}
        close={() => setVisible(false)}
        onAdd={addItem}  
      />
    </div>
  )
}
