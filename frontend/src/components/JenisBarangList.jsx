import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { SERVER_URL } from "../config/config";

const JenisBarangList = () => {
  const [jenisBarangList, setJenisBarangList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJenis, setSelectedJenis] = useState(null);
  const [nama, setNama] = useState("");

  useEffect(() => {
    fetchJenisBarang();
  }, []);

  const fetchJenisBarang = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/api/jenis_barang");
      setJenisBarangList(response.data);
    } catch (error) {
      console.error("Error fetching jenis_barang:", error);
    }
  };

  const handleAdd = () => {
    setShowModal(true);
    setSelectedJenis(null);
    setNama("");
  };

  const handleEdit = (jenis) => {
    setShowModal(true);
    setSelectedJenis(jenis);
    setNama(jenis.Nama);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda yakin mengahapus data ini?")) {
      try {
        await axios.delete(SERVER_URL + `/api/jenis_barang/${id}`);
        fetchJenisBarang();
      } catch (error) {
        console.error("Error menghapus jenis_barang:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (selectedJenis) {
        // Update existing jenis_barang
        await axios.put(
          SERVER_URL + `/api/jenis_barang/${selectedJenis.JenisBarangID}`,
          { Nama: nama }
        );
      } else {
        // Create new jenis_barang
        await axios.post(SERVER_URL + "/api/jenis_barang", { Nama: nama });
      }
      setShowModal(false);
      fetchJenisBarang();
    } catch (error) {
      console.error("Error menyimpan jenis_barang:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Jenis Barang</h2>
      <Button className="mb-3" onClick={handleAdd}>
        Tambah Jenis Barang
      </Button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jenisBarangList.map((jenis) => (
            <tr key={jenis.JenisBarangID}>
              <td>{jenis.JenisBarangID}</td>
              <td>{jenis.Nama}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(jenis)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(jenis.JenisBarangID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedJenis ? "Edit Jenis Barang" : "Tambah Jenis Barang"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {selectedJenis ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JenisBarangList;
