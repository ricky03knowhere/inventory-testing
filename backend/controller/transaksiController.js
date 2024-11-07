const db = require("../config/db");

// Search and sort data by nama barang or tanggal transaksi
exports.getAllTransaksi = async (req, res) => {
  const { search, sortBy, order } = req.query;
  let sql = `SELECT b.BarangID, b.NamaBarang, b.Stok, t.TransaksiID, t.JumlahTerjual, t.TanggalTransaksi 
            FROM barang AS b 
            JOIN transaksi AS t ON b.BarangID = t.BarangID`;

  if (search) {
    sql += ` WHERE b.NamaBarang LIKE '%${search}%'`;
  }

  if (sortBy) {
    if (sortBy === "NamaBarang") {
      sql += ` ORDER BY b.NamaBarang ${order}`;
    } else if (sortBy === "TanggalTransaksi") {
      sql += ` ORDER BY t.TanggalTransaksi ${order}`;
    }
  }

  try {
    const [results] = await db.query(sql);
    res.json(results);
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
      new Date(TanggalTransaksi),
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

// Compare jenis barang to display transactions with highest or lowest sales
exports.barangSales = async (req, res) => {
  const { order, startDate, endDate } = req.query;
  let sql = `SELECT b.BarangID, b.NamaBarang, j.Nama AS JenisBarang, SUM(t.JumlahTerjual) AS TotalTerjual 
            FROM barang AS b JOIN jenis_barang AS j ON b.JenisBarang = j.JenisBarangID 
            JOIN transaksi AS t ON b.BarangID = t.BarangID 
            WHERE t.TanggalTransaksi BETWEEN '${startDate}' AND '${endDate}' GROUP BY b.BarangID ORDER BY TotalTerjual ${order}`;

  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
