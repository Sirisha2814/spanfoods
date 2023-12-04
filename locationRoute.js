const express = require('express');
const router = express.Router();

const {
  createLocations, getLocations
} = require('../controllers/locationController');

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect).post(protect,createLocations)
router.get('/getLocations', getLocations)


module.exports = router;