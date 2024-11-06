const express = require('express');
const router = express.Router();
const barangController = require('../controller/barangController');

// Routes for Barang
router.get('/', barangController.getAllBarang);
router.get('/:id', barangController.getBarangById);
router.post('/', barangController.createBarang);
router.put('/:id', barangController.updateBarang);
router.delete('/:id', barangController.deleteBarang);

module.exports = router;