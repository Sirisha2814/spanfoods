const express = require('express');
const router = express.Router();

const {
  createMealTypes, getMealTypes
} = require('../controllers/MealtypeController');

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect).post(protect,createMealTypes)
router.get('/getMealTypes', getMealTypes)

module.exports = router;