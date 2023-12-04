const express = require('express');
const router = express.Router();

const {
  createFoodItem,
  getFoodItems
} = require('../controllers/fooditemsController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect).post(protect, createFoodItem);

router.get('/getfooditems', getFoodItems);

module.exports = router;