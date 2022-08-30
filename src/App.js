import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreateCustomer from "./Create";
import CustomerList from "./List";

function App() {
  return (
    <Router>
      <Navbar bg="success">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            TEST (Emmanuel Mtasiwa)
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/create" element={<CreateCustomer />} />
              <Route exact path="/" element={<CustomerList />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
