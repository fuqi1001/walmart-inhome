const router = require('express').Router();
import db from '../db/database';
import { dbFetchParser } from '../utils/utils';
var _ = require('lodash');

router.get('/list', async (req, res, next) => {
  try {
    const orderListQuery = `
      SELECT o.id as order_id, o.user_id, u.name as username, oi.item_id, i.name from orders o 
        left join users u on o.user_id = u.id
        left join order_items oi on o.id = oi.order_id
        left join items i on i.id = oi.item_id;
    `;
    let result = dbFetchParser(await db.query(orderListQuery, []));
    // result = _.chain(result).groupBy("order_id").map((value, key) => ({ order_id: key, items: value})).value();
    result = _.groupBy(result, function(item) {
      return item.order_id + '#' + item.username
    });
    result = _.map(result, function(item) {
      return {
        order_id: item[0].order_id,
        username: item[0].username,
        items: _.map(item, function(oItem) {
          return {
            item_id: oItem.item_id,
            item_name: oItem.name 
          }
        })
      }
    })
    res.status(200).json({ok: 1, data: result});
  } catch (err) {
    res.status(500).json({ ok: 0, message: err.message })
  }
});

router.get('/:orderId', async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const fetchOrderByOrderId = `
      SELECT o.id as order_id, o.user_id, u.name as username, oi.item_id, i.name from orders o 
        left join users u on o.user_id = u.id
        left join order_items oi on o.id = oi.order_id
        left join items i on i.id = oi.item_id
      where order_id=${orderId};
    `
    let result = dbFetchParser(await db.query(fetchOrderByOrderId, []));
    // result = _.chain(result).groupBy("order_id").map((value, key) => ({ order_id: key, items: value})).value();
    result = _.groupBy(result, function(item) {
      return item.order_id + '#' + item.username
    });
    result = _.map(result, function(item) {
      return {
        order_id: item[0].order_id,
        username: item[0].username,
        items: _.map(item, function(oItem) {
          return {
            item_id: oItem.item_id,
            item_name: oItem.name 
          }
        })
      }
    })
    res.status(200).json({ok: 1, data: result});
  } catch (err) {
    res.status(500).json({ ok: 0, message: err.message })
  }
})

router.patch('/:orderId', async (req, res, next) => {
  try {
    const items = req.body;
    const { orderId } = req.params;
    const removeAll = `
      DELETE FROM order_items where order_id=${orderId};
    `
    await db.query(removeAll, []);

    if (items.length) {
      let insertNewQuery = 'INSERT INTO order_items VALUES';
      let value = '';
      for(let i = 0; i < items.length; i++) {
        value = value.concat(`(${orderId}, ${items[i]})`); 
        if (i <= items.length - 2) {
          value = value.concat(',')
        }
      }
      insertNewQuery = insertNewQuery.concat(value).concat(";");
      await db.query(insertNewQuery, []);
    }
    
    res.status(200).json({ok: 1, data: []});
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ ok: 0, message: err.message })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const countQuery = 'select count(*) as count from orders;';
    const currCount = dbFetchParser(await db.query(countQuery, []));
    
    const nextOrderId = currCount[0].count + 1;
    const insertOrderQuery = `
      INSERT INTO orders values (${nextOrderId}, ${body.user_id});
    `
    await db.query(insertOrderQuery, []);

    let insertNewItemsQuery = 'INSERT INTO order_items VALUES';
    let value = '';
    const { items } = body;
    if (items.length) {
      for(let i = 0; i < items.length; i++) {
        value = value.concat(`(${nextOrderId}, ${items[i]})`); 
        if (i <= items.length - 2) {
          value = value.concat(',')
        }
      }
      insertNewItemsQuery = insertNewItemsQuery.concat(value).concat(";");
      await db.query(insertNewItemsQuery, []);
    }
    res.status(200).json({ok: 1, data: []});
  } catch (err) {
    res.status(500).json({ ok: 0, message: err.message })
  }
}) 

module.exports = router