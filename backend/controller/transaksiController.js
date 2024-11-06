const db = require("../config/db");

exports.getAllTransaksi = async (req, res) => {
  const sql =
    "SELECT t.TransaksiID, b.NamaBarang AS Barang, t.JumlahTerjual, t.TanggalTransaksi FROM transaksi AS t JOIN barang AS b ON t.BarangID = b.BarangID";

  try {
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransaksi = async (req, res) => {
  const { BarangID, JumlahTerjual, TanggalTransaksi } = req.body;
  const sql =
    "INSERT INTO transaksi (BarangID, JumlahTerjual, TanggalTransaksi) VALUES (?, ?, ?)";
  try {
    const [result] = await db.query(sql, [
      BarangID,
      JumlahTerjual,
      TanggalTransaksi,
    ]);
    res.status(201).json({
      message: "Transaction added successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


