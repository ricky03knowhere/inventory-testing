const express = require("express");
const router = express.Router();
const jenisBarangController = require("../controller/jenisBarangController");

// Routes for Jeins Barang
router.get("/", jenisBarangController.getAllJenisBarang);
router.get("/:id", jenisBarangController.getJenisBarangById);
router.post("/", jenisBarangController.createJenisBarang);
router.put("/:id", jenisBarangController.updateJenisBarang);
router.delete("/:id", jenisBarangController.deleteJenisBarang);

module.exports = router;
