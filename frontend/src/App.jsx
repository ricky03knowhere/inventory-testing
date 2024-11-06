import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import BarangList from "./components/BarangList";
// import TopSelling from "./components/TopSelling";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TransaksiList from "./components/TransaksiList";

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Inventory Management</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Daftar Barang</Nav.Link>
            <Nav.Link href="/transaksi">Daftar Transaksi</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="my-4">
        <BrowserRouter>
          <Routes>
            <Route Component={BarangList} path="/" />
            <Route Component={TransaksiList} path="/transaksi" />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
