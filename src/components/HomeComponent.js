import React from 'react';
import { NavLink } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, Nav , NavItem, Navbar } from 'reactstrap';
import { Link } from "react-router-dom";

function Home() {
  return (
      <>
        <div className="container">

        <div className="row">
        
        <div className="col-12">
          <h3 className="pageHead">Home</h3>
          <hr />
        </div>
        </div>
        </div>
        <Navbar>
            <div className="container">
                <h5 className="col-12">Welcome to expense tracker</h5>
                <p className="col-12">Login by pressing the login buttton</p>
            <Nav navbar>
                {/* <NavItem>
                    <NavLink className="nav-link" to="/home">
                        <span className="fa fa-home fa-lg"></span> Home
                    </NavLink>
                </NavItem> */}
                <NavItem>
                    <NavLink className="nav-link" to="/login">
                        <span className="fa fa-sign-in fa-lg"></span> Login
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/register">
                        <span className="fa fa-user fa-lg"></span> Register
                    </NavLink>
                </NavItem>
            </Nav>
            </div>
        </Navbar>
    </>
  );
}
 
export default Home;