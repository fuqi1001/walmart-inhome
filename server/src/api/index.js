const router = require('express').Router();
import userRoutes from './userRoutes';
import orderRoutes from './orderRoutes';
import itemRoutes from './itemRoutes';

router.use('/user', userRoutes);
router.use('/order', orderRoutes);
router.use('/item', itemRoutes);

router.use((req, res, next) => {
  const err = new Error('Router Not Found!');
  err.status = 404;
  next(err);
});

module.exports = router
