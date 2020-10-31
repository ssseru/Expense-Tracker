import React from 'react';
import { NavLink } from "react-router-dom"
import { Nav , NavItem, Navbar } from 'reactstrap';
function Home() {
  return (
      <>
      <Navbar>
        <div className="container">
            <h5 className="col-12">Welcome to expense tracker</h5>
            <p className="col-12">Login by pressing the login buttton</p>
        <Nav navbar>
            <NavItem>
                <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" to="/login">
                    <span className="fa fa-info fa-lg"></span> Login
                </NavLink>
            </NavItem>
        </Nav>
        </div>
        </Navbar>
    </>
  );
}
 
export default Home;