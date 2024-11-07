import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import BarangModalForm from "./BarangModalForm";
import { SERVER_URL } from "../config/config";

function BarangList() {
  const [barang, setBarang] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/api/barang/");
      setBarang(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowEditModal = (barang) => {
    setSelectedBarang(barang);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleShowDeleteConfirm = (barang) => {
    setSelectedBarang(barang);
    setShowDeleteConfirm(true);
  };
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleDelete = async () => {
    try {
      await axios.delete(SERVER_URL + `/api/barang/${selectedBarang.BarangID}`);
      fetchBarang();
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h2>Daftar Barang</h2>
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={handleShowAddModal}>
            Tambah Barang
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Barang</th>
            <th>Jenis Barang</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((item, i) => (
            <tr key={item.BarangID}>
              <td>{i + 1}</td>
              <td>{item.NamaBarang}</td>
              <td>{item.JenisBarang === 1 ? "Konsumsi" : "Pembersih"}</td>
              <td>{item.Stok}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowEditModal(item)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleShowDeleteConfirm(item)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Item Modal */}
      <BarangModalForm
        show={showAddModal}
        handleClose={handleCloseAddModal}
        fetchBarang={fetchBarang}
      />

      {/* Edit Item Modal */}
      {selectedBarang && (
        <BarangModalForm
          show={showEditModal}
          handleClose={handleCloseEditModal}
          fetchBarang={fetchBarang}
          editData={selectedBarang}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah anda yakin untuk menghapus data{" "}
          <strong>{selectedBarang?.NamaBarang}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BarangList;
