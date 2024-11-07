const db = require("../config/db");

// Get all Barang
exports.getAllBarang = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Barang");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Barang by ID
exports.getBarangById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Barang WHERE BarangID = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Barang not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new Barang
exports.createBarang = async (req, res) => {
  const { NamaBarang, JenisBarang, Stok } = req.body;
  try {
    const [
      result,
    ] = await db.query(
      "INSERT INTO Barang (NamaBarang, JenisBarang, Stok) VALUES (?, ?, ?)",
      [NamaBarang, JenisBarang, Stok]
    );
    res
      .status(201)
      .json({ BarangID: result.insertId, NamaBarang, JenisBarang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Barang
exports.updateBarang = async (req, res) => {
  const { NamaBarang, JenisBarang, Stok } = req.body;
  try {
    const [
      result,
    ] = await db.query(
      "UPDATE Barang SET NamaBarang = ?, JenisBarang = ?, Stok = ? WHERE BarangID = ?",
      [NamaBarang, JenisBarang, Stok, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Barang not found" });
    res.json({ message: "Barang updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Barang
exports.deleteBarang = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM Barang WHERE BarangID = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Barang not found" });
    res.json({ message: "Barang deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


