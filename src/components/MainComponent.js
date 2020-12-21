import React from "react"
import {
    
} from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./LoginComponent"
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent"
import Dashboard from "./DashboardComponent"

import "../App.css"
import Register from "./RegisterComponent";
export default function Main() {
    
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/register" component={Register} />
                    <Redirect to="/home" />
                </Switch>
                {/* <Footer /> */}
            </div>
            
        )
    
}

