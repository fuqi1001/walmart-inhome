import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import { Checkbox, Row, Col } from 'antd';

const ModifyOrderModal = ({...props}) => {
  
  const { visible, items } = props;
  
  const [itemList, setItemList] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {setCheckedItems(props.items)}, [props.items])
  
  async function fetchItemList() {
    try {
      const response = await axios.get('/api/item/list');
      const data = response.data.data;
      setItemList(data);
    } catch (err) {
      window.alert(err);
    }
  }

  const handleModify = e => {
    e.preventDefault();
    props.modify(checkedItems);
  }

  useEffect(() => { fetchItemList() }, []);

  const option = itemList.map(item => {
    return {
      label: item.name,
      value: item.id
    }
  });

  return (
    <Modal
      visible={visible}
      onCancel={props.close()}
      onOk={handleModify}
      closable={false}
    >
      <div>
        <Checkbox.Group 
          defaultValue={items} 
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

export default ModifyOrderModal;