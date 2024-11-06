import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { SERVER_URL } from "../config/config";

const TransaksiList = () => {
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    BarangID: "",
    JumlahTerjual: "",
    TanggalTransaksi: "",
  });

  useEffect(() => {
    fetchTransactions();
    fetchItems();
  }, []);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/api/transaksi");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Fetch items for the dropdown in the form
  const fetchItems = async () => {
    try {
      const response = await axios.get(SERVER_URL + "/api/barang"); // assuming /api/items returns list of items with id and name
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

  return (
    <div className="container mt-4">
      <h2>Transaction List</h2>
      <Button variant="primary" className="mb-3" onClick={handleShowAddModal}>
        Add Transaction
      </Button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Quantity Sold</th>
            <th>Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.TransaksiID}>
              <td>{transaction.TransaksiID}</td>
              <td>{transaction.Barang}</td>
              <td>{transaction.JumlahTerjual}</td>
              <td>{transaction.TanggalTransaksi}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Transaction Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item</Form.Label>
              <Form.Select
                name="BarangID"
                value={newTransaction.BarangID}
                onChange={handleInputChange}
              >
                <option value="">Select Item</option>
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
                value={newTransaction.JumlahTerjual}
                onChange={handleInputChange}
                placeholder="Enter quantity sold"
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Transaction Date</Form.Label>
              <Form.Control
                type="date"
                name="TanggalTransaksi"
                value={newTransaction.TanggalTransaksi}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransaksiList;
