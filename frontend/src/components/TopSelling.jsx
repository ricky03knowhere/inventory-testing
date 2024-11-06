import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";

function TopSelling() {
  const [topSelling, setTopSelling] = useState([]);
  const [jenisBarang, setJenisBarang] = useState("Konsumsi");
  const [sort, setSort] = useState("DESC");

  const fetchTopSelling = async () => {
    try {
      const response = await axios.get("/api/barang/top-selling", {
        params: { jenisBarang, sort },
      });
      setTopSelling(response.data);
    } catch (error) {
      console.error("Error fetching top selling:", error);
    }
  };

  useEffect(() => {
    fetchTopSelling();
  }, [jenisBarang, sort]);

  return (
    <div>
      <h2>Top Selling</h2>
      <Form className="mb-3">
        <Form.Group controlId="jenisBarang">
          <Form.Label>Jenis Barang</Form.Label>
          <Form.Select
            value={jenisBarang}
            onChange={(e) => setJenisBarang(e.target.value)}
          >
            <option value="Konsumsi">Konsumsi</option>
            <option value="Pembersih">Pembersih</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="sort">
          <Form.Label>Sort Order</Form.Label>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="DESC">Highest to Lowest</option>
            <option value="ASC">Lowest to Highest</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={fetchTopSelling}>
          Fetch
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nama Barang</th>
            <th>Total Terjual</th>
          </tr>
        </thead>
        <tbody>
          {topSelling.map((item, index) => (
            <tr key={index}>
              <td>{item.NamaBarang}</td>
              <td>{item.TotalTerjual}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TopSelling;
