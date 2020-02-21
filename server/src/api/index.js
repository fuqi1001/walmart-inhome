const router = require('express').Router();
import userRoutes from './userRoutes';

router.use('/user', userRoutes);

router.use((req, res, next) => {
  const err = new Error('Router Not Found!');
  err.status = 404;
  next(err);
});

module.exports = router
