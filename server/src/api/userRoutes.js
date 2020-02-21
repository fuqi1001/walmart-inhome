const router = require('express').Router();
import db from '../db/database';

router.get('/list', (req, res, next) => {
  db.all('SELECT * FROM users', (error, users) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({
        ok: 1,
        data: users
      });
    }
  });
});

module.exports = router