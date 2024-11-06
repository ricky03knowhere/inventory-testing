const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const barangRoutes = require('./route/barangRoute');
const transaksiRoutes = require('./route/transaksiRoute');

const app = express();
app.use(cors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
app.use(bodyParser.json());

// Use routes
app.use('/api/barang', barangRoutes);
app.use('/api/transaksi', transaksiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});