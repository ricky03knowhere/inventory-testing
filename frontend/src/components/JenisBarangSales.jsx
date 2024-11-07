import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import { SERVER_URL } from "../config/config";
import { getNowDate } from "../utils/utils";

const JenisBarangSales = () => {
  const [transactions, setTransactions] = useState([]);

  const [order, setOrder] = useState("ASC");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(getNowDate());

  useEffect(() => {
    fetchTransactions();
  }, [order, startDate, endDate]);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        SERVER_URL + "/api/transaksi/penjualan",
        {
          params: { order, startDate, endDate },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Penjualan Jenis Barang</h2>

      <Form>
        <Row className="align-items-center mb-3">
          <Col md={2}>
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Form.Select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="ASC">Terendah</option>
              <option value="DESC">Terbanyak</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Barang ID</th>
            <th>Nama Barang</th>
            <th>Jenis Barang</th>
            <th>Total Terjual</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length != 0 ? (
            transactions.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.BarangID * 33}</td>
                <td>{item.NamaBarang}</td>
                <td>{item.JenisBarang}</td>
                <td>{item.TotalTerjual} pcs</td>
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
    </div>
  );
};

export default JenisBarangSales;
