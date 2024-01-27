const express = require('express');
const router = express.Router();
const bitMapController = require('../Controllers/bitMapController');

router.get('/', bitMapController.getBitMap);
router.get('/lock', bitMapController.lockById);
router.get('/unlock', bitMapController.unlockById);
router.get('/changeColorOfBit', bitMapController.changeColorOfBit);
router.get('/createMap', bitMapController.createMap);
router.get('/getBitMap', bitMapController.getBitMap);

module.exports = router;
