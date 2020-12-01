import React from "react"
import {
    Button,
    FormGroup,
    Label,
    Input,
    Form,
    Breadcrumb,
    BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { username, access_token, isAdmin } = this.props.location.state;
        return(
            <>
                <div className="container">
                    <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                        <Link to="/login">Logout</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Dashboard</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3 className="pageHead">Dashboard</h3>
                        <hr />
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="dashboardHeader">   
                        <h5>Username: {username}</h5>
                        <p className="forToken">Access Token: {access_token}</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <h5>Add New Income</h5>    
                            </div>
                            <div className="col-6">
                                <h5>Add New Expense</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard