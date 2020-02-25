const router = require('express').Router();
import db from '../db/database';
import { dbFetchParser } from '../utils/utils';
var _ = require('lodash');

router.get('/list', async (req, res, next) => {
  try {
    const itemListQuery = `SELECT * FROM items`;
    let result = dbFetchParser(await db.query(itemListQuery, []));
    res.status(200).json({ok: 1, data: result});
  } catch (err) {
    res.status(500).json({ ok: 0, message: err.message })
  }
});

router.get('/:itemId', async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const fetchItemByOrderId = `SELECT * FROM items where id=${itemId}`;
    let result = dbFetchParser(await db.query(fetchItemByOrderId, []));
    res.status(200).json({ok: 1, data: result});
  } catch (err) {
    res.status(500).json({ ok: 0, message: err.message })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const reqName = req.body.name;
    if (reqName == '') {
      throw new Error('Item name required');
    }
    const addItemQuery = `INSERT INTO items (name) VALUES ("${reqName}")`;
    await db.query(addItemQuery, []);
    const itemListQuery = `SELECT * FROM items`;
    let result = dbFetchParser(await db.query(itemListQuery, []));
    res.status(200).json({ok: 1, data: result});
  } catch (err) {
    res.status(200).json({ ok: 0, message: err.message })
  }
})

module.exports = router