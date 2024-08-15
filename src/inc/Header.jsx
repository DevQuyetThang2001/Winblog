// eslint-disable-next-line no-unused-vars
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import Footer from "./Footer";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useAuth();
  console.log(userInfo?.email);
  const handleSignOut = () => {
    signOut(auth)
    toast.info("Sign Out Successfully")
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body">
        <Navbar.Brand href="/" className="text-success fw-bold">Windev Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
          </Nav>
          {userInfo?.email ? (
            <>
              <span className="text-dark text-center">
                Account: {userInfo?.displayName || userInfo?.email}
                <button onClick={handleSignOut} className="btn rounded-3 bg-danger text-light mx-2">Sign Out</button>
              </span>
             
            </>
          ) : (
            <NavLink
              to={"/sign-in"}
              className="p-2 bg-info rounded-md text-light"
            >
              Sign In
            </NavLink>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Outlet></Outlet>
      <Footer/>
    </>
  );
};

export default Header;
