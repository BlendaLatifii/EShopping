import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Header(){
  const cartCount = 3;
  const favoritesCount = 0;

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          eStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Category">Category</Nav.Link>
            <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>

            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Search for products"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>

          <div className="d-flex align-items-center gap-3">
            <Link to="/profile" className="text-dark position-relative">
              <FaUser size={20} />
            </Link>

            <Link to="/favorites" className="text-dark position-relative">
              <FaHeart size={20} />
              {favoritesCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {favoritesCount}
                </Badge>
              )}
            </Link>

            <Link to="/cart" className="text-dark position-relative">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};