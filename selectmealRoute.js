const express = require('express');
const router = express.Router();

const {
  createMeal, getMeal
} = require('../controllers/mealController');

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect).post(protect,createMeal)
router.get('/getMeal', getMeal)


module.exports = router;