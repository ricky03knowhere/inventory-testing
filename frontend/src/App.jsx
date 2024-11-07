import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import BarangList from "./components/BarangList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TransaksiList from "./components/TransaksiList";
import JenisBarangSales from "./components/JenisBarangSales";
import JenisBarangList from "./components/JenisBarangList";

function App() {
  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Inventory Management</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Daftar Barang</Nav.Link>
            <Nav.Link href="/jenis_barang">Daftar Jenis Barang</Nav.Link>
            <Nav.Link href="/transaksi">Daftar Transaksi</Nav.Link>
            <Nav.Link href="/penjualan">Penjualan Barang</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="my-4">
        <BrowserRouter>
          <Routes>
            <Route Component={BarangList} path="/" />
            <Route Component={JenisBarangList} path="/jenis_barang" />
            <Route Component={TransaksiList} path="/transaksi" />
            <Route Component={JenisBarangSales} path="/penjualan" />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
