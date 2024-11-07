import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { SERVER_URL } from "../config/config";
import { getNowDate } from "../utils/utils";

const TransaksiList = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    BarangID: 1,
    JumlahTerjual: 0,
    TanggalTransaksi: getNowDate(),
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("NamaBarang");
  const [order, setOrder] = useState("ASC");

  useEffect(() => {
    fetchTransactions();
    fetchItems();
  }, [search, sortBy, order, newTransaction]);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/api/transaksi", {
        params: { search, sortBy, order },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Fetch items for the dropdown in the form
  const fetchItems = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/api/barang");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Show Add Transaction Modal
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: value,
    });

    console.log(newTransaction);
  };

  // Submit new transaction
  const handleAddTransaction = async () => {
    try {
      await axios.post(SERVER_URL + "/api/transaksi", newTransaction);
      fetchTransactions();
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  console.log(newTransaction.TanggalTransaksi);

  return (
    <div className="container mt-4">
      <h2>Daftar Transaksi</h2>

      <Form>
        <Row className="align-items-center mb-3">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="NamaBarang">Sort by Name</option>
              <option value="TanggalTransaksi">Sort by Date</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
        Tambah Transaksi
      </Button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>ID Transaksi</th>
            <th>Nama Barang</th>
            <th>Jumlah Terjual</th>
            <th>Tanggal Transaksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length != 0 ? (
            transactions.map((transaction, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {transaction.BarangID * 33}
                  {transaction.TransaksiID * 77}
                </td>
                <td>{transaction.NamaBarang}</td>
                <td>{transaction.JumlahTerjual}</td>
                <td>{transaction.TanggalTransaksi?.substr(0, 10)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <h4 className="m-2">Data Tidak Ditemukan</h4>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Transaction Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Transaksi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item</Form.Label>
              <Form.Select
                name="BarangID"
                value={newTransaction.BarangID}
                onChange={handleInputChange}
                required
              >
                {items.map((item) => (
                  <option key={item.BarangID} value={item.BarangID}>
                    {item.NamaBarang}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Quantity Sold</Form.Label>
              <Form.Control
                type="number"
                name="JumlahTerjual"
                min="0"
                value={newTransaction.JumlahTerjual}
                onChange={handleInputChange}
                placeholder="Enter quantity sold"
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Transaction Date</Form.Label>
              <Form.Control
                type="date"
                name="TanggalTransaksi"
                value={newTransaction.TanggalTransaksi}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleAddTransaction}>
            Tambah Transaksi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransaksiList;
