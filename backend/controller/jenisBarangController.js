const db = require("../config/db");

// Get all Jenis Barang
exports.getAllJenisBarang = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Jenis_Barang");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Jenis Barang by ID
exports.getJenisBarangById = async (req, res) => {
  try {
    const [
      rows,
    ] = await db.query("SELECT * FROM Jenis_Barang WHERE JenisBarangID = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Jenis Barang not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new Jenis Barang
exports.createJenisBarang = async (req, res) => {
  const { Nama } = req.body;
  try {
    const [
      result,
    ] = await db.query("INSERT INTO Jenis_Barang (Nama) VALUES (?)", [Nama]);
    res.status(201).json({
      JenisBarangID: result.insertId,
      Nama,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Jenis Barang
exports.updateJenisBarang = async (req, res) => {
  const { Nama } = req.body;
  try {
    const [
      result,
    ] = await db.query(
      "UPDATE Jenis_Barang SET Nama = ? WHERE JenisBarangID = ?",
      [Nama, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Jenis Barang not found" });
    res.json({ message: "Jenis Barang updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Jenis Barang
exports.deleteJenisBarang = async (req, res) => {
  try {
    const [
      result,
    ] = await db.query("DELETE FROM Jenis_Barang WHERE JenisBarangID = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Jenis Barang not found" });
    res.json({ message: "Jenis Barang deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
