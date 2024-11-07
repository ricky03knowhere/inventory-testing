// src/components/BarangModalForm.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { SERVER_URL } from "../config/config";

function BarangModalForm({ show, handleClose, fetchBarang, editData }) {
  const [namaBarang, setNamaBarang] = useState("");
  const [jenisBarang, setJenisBarang] = useState(1);
  const [stok, setStok] = useState("");

  useEffect(() => {
    if (editData) {
      setNamaBarang(editData.NamaBarang);
      setJenisBarang(editData.JenisBarang);
      setStok(editData.Stok);
    } else {
      setNamaBarang("");
      setJenisBarang(1);
      setStok("");
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        // Update item
        await axios.put(SERVER_URL + `/api/barang/${editData.BarangID}`, {
          NamaBarang: namaBarang,
          JenisBarang: jenisBarang,
          Stok: stok,
        });
      } else {
        // Add new item
        await axios.post(SERVER_URL + "/api/barang", {
          NamaBarang: namaBarang,
          JenisBarang: jenisBarang,
          Stok: stok,
        });
      }
      fetchBarang(); // Refresh the item list after adding/editing
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? "Edit Barang" : "Tambah Barang"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNamaBarang">
            <Form.Label>Nama Barang</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukan nama barang"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formJenisBarang">
            <Form.Label>Jenis Barang</Form.Label>
            <Form.Select
              value={jenisBarang}
              onChange={(e) => setJenisBarang(e.target.value)}
              required
            >
              <option value="1">Konsumsi</option>
              <option value="2">Pembersih</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStok">
            <Form.Label>Stok</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukan jumlah stok"
              value={stok}
              onChange={(e) => setStok(e.target.value)}
              required
              min="0"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {editData ? "Update" : "Save"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BarangModalForm;
