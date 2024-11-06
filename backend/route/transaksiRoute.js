const express = require('express');
const router = express.Router();
const transaksiController = require('../controller/transaksiController');

// Routes for Transaksi
router.get('/', transaksiController.getAllTransaksi);
router.post('/', transaksiController.createTransaksi);

module.exports = router