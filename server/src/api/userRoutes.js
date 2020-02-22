const router = require('express').Router();
import db from '../db/database';
import { dbFetchParser } from '../utils/utils';
var _ = require('lodash');

router.get('/list', async (req, res, next) => {
  try {
    const listUserQuery = 'SELECT * FROM users';
    let result = await db.query(listUserQuery, []);
    result = dbFetchParser(result)
    res.status(200).json({ ok: 1, data: result })
  } catch (err) {
    res.status(500).json({ ok: 0, message: err })
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userQuery = `SELECT * FROM users where id=${userId}`;
    const result = await db.query(userQuery, []);
    res.status(200).json({ok: 1, data: dbFetchParser(result)});
  } catch (err) {
    res.status(500).json({ ok: 0, message: err });
  }
});

router.get('/orders/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userOrdersQuery = 
    `select orderT.*, i.name from 
      (select * from order_items where order_id in (select id from orders where user_id=${userId})) orderT
       INNER JOIN items i on orderT.item_id = i.id;`;
    let result = dbFetchParser(await db.query(userOrdersQuery, []));
    // result = _.chain(result).groupBy("order_id").map((value, key) => ({ order_id: key, items: value})).value();
    result = _.groupBy(result, function(item) {
      return item.order_id
    });
    result = _.map(result, function(user) {
      return {
        order_id: user[0].order_id,
        items: _.map(user, function(item) {
          return {
            item_id: item.item_id,
            item_name: item.name,
          }
        })
      }
    })
    res.status(200).json({ok: 1, data: result});
  } catch (err) {
    res.status(500).json({ ok: 0, message: err });
  }
});

module.exports = router