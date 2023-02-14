const { Router } = require('express');
const placeController = require('../controllers/placeController');
const mod = require('../../models/index');

const router = Router();

router.get('/places', placeController.getAll );
router.post('/add-place', placeController.addPlace );
router.get('/get-place', mod.Place.getPlaceById );

module.exports = router;