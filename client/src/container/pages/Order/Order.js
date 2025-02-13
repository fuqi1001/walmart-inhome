import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './Order.scss';
import { Table, Button, Icon } from 'antd';
import ModifyOrderModal from './self/ModifyOrder';
import AddOrderModal from './self/AddOrder';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      selectedOrder: null,
      items: [],
      modalId: '1',
      modalVisble: false,
      addModalVisible: false,
      addModalId: new Date().getTime(),
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/order/list');
      const data = response.data.data;
      this.setState({
        orderList: data,
      })
    } catch (err){
      window.alert(err);
    }
  }
  
  handleModifyOrder = async req => {
    const { selectedOrder } = this.state;
    try {
      await axios.patch(`/api/order/${selectedOrder.order_id}`, req);
      const response = await axios.get('/api/order/list');
      const data = response.data.data;
      this.setState({
        orderList: data,
      })
    } catch (err) {
      window.alert(err);
    }
    this.closeModifyModal();
  }

  expandedRowRender = record => {
    const { items } = record;
    return (
      <Fragment>
        {
          items.map((item, i) => (
            <div key={i}>
              <span>Item: #{item.item_id} - {item.item_name}</span>
            </div>
          ))
        }
      </Fragment>
    )
  }

  openAddModal = () => {
    this.setState({
      addModalVisible: true,
      modalId: new Date().getTime(),
    });
  }

  closeAddModal = () => {
    this.setState({
      addModalVisible: false,
    });
  }

  handleAddOrder = async req => {
    try {
      const addRes = await axios.post('/api/order', req);
      if (addRes.data.ok) {
        const response = await axios.get('/api/order/list');
        const data = response.data.data;
        this.setState({
          orderList: data,
        });
      } else {
        window.alert(addRes.data.message);  
      }
    } catch (err) {
      window.alert(err.message);
    }
    this.closeAddModal();
  }
  
  openModifyModal = record => {
    const items = record.items.map(item => {return item.item_id})
    this.setState({
      modalVisble: true,
      selectedOrder: record,
      items,
      modalId: record.order_id,
    })
  }
  
  closeModifyModal = () => {
    this.setState({
      modalVisble: false,
      selectedOrder: null,
      items: [],
      modalId: '1',
    })
  }

  render() {
    const { orderList, modalVisble, selectedOrder, items, modalId, addModalVisible, addModalId } = this.state;
    const columns = [
      {
        title: 'Order ID',
        dataIndex: 'order_id',
        width: 200,
      },
      {
        title: 'User',
        dataIndex: 'username',
        width: 200,
      },
      {
        title: 'Total Items',
        align: 'right',
        width: 200,
        render: (text, record) => (
          <Fragment>
            {record.items.length}
          </Fragment>
        )
      },
      {
        title: 'Action',
        align: 'right',
        width: 200,
        render: (text, record) => (
          <Fragment>
            <Button onClick={() => this.openModifyModal(record)}>Modify</Button>
          </Fragment>
        )
      }
    ];
    return (
      <div className="order">
        <div className="order-inner">
          <Button type="primary" className="btn-add" size='large' onClick={this.openAddModal}>
            <Icon type="plus" />
          </Button>
          <Table
            columns={columns}
            expandedRowRender={this.expandedRowRender}
            dataSource={orderList}
            rowKey="order_id"
          />
        </div>
        <ModifyOrderModal
          visible={modalVisble}
          order={selectedOrder}
          close={() => this.closeModifyModal}
          modify={this.handleModifyOrder}
          items={items}
          key={modalId}
        />
        <AddOrderModal
          modalVisible={addModalVisible}
          close={this.closeAddModal}
          add={this.handleAddOrder}
          key={addModalId}
        />
      </div>
    )
  }
}

export default Order;