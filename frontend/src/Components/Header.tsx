import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Form, FormControl, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart,FaArrowAltCircleRight } from "react-icons/fa";
import { CartItemService } from "../Services/CartItemService.ts";
import { AuthService } from "../Services/AuthService.ts";

export default function Header(){
  const [cartItemCount , setCartItemCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCarts = async () => {
    const countCart = await CartItemService.CountCartItems();
    setCartItemCount(countCart);
  }

  const logOut = async () =>{
    await AuthService.LogOut();
  }

   useEffect(() => {
      fetchCarts();
    }, []);
 
    const handleSearch = (e:any) => {
         e.preventDefault();

        if (!searchTerm.trim()) return;

    };
    const isAdmin = AuthService.isAdmin();
  return (
    <>
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/HomePage">
          eStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/HomePage">Home</Nav.Link>
            <Nav.Link as={Link} to="/Category">Category</Nav.Link>
            <Nav.Link as={Link} to="/Cart">Cart</Nav.Link>

          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search for products"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary">Search</Button>
          </Form>

          <div className="d-flex align-items-center gap-3">
            <Link to="/MyProfile" className="text-dark position-relative">
              <FaUser size={20} />
            </Link>

            <Link to="/Cart" className="text-dark position-relative">
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
            <Link to="/" className="text-dark position-relative" onClick={() => logOut()}>
              <FaArrowAltCircleRight size={20} />
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* {isAdmin && <Sidebar/>} */}
    </>
  );
};