import React from "react"
import {
    Button,
    FormGroup,
    Label,
    Input,
    Form,
    Breadcrumb,
    BreadcrumbItem,
    Card
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios';


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount:"",
            source: "",
            category: "",
            expense: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleIncome = this.handleIncome.bind(this)
        this.handleExpense = this.handleExpense.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.id]:event.target.value
        });
      }

    handleIncome = event => {
        event.preventDefault();
        const headers = {
            'access_token': this.props.location.state.access_token, 
          }
        const params ={
            'source':this.state.source,
            'amount': this.state.amount
        }
        axios.post('/add_income', { } ,{ headers: headers, params: params })
          .then((response) => {
            alert(response.data.message);
          }, (error) => {
            alert(error.response.data.message);
          });
        this.setState({
            amount:"",
            source: ""
        });
    }

    handleExpense = event => {
        event.preventDefault();
        const headers = {
            'access_token': this.props.location.state.access_token, 
          }
        const params ={
            'category':this.state.category,
            'amount': this.state.expense
        }
        axios.post('/add_expense', { } ,{ headers: headers, params: params })
          .then((response) => {
            alert(response.data.message);
          }, (error) => {
            alert(error.response.data.message);
          });
        this.setState({
            category:"",
            expense: ""
        });
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
                                <Form onSubmit={this.handleIncome}>
                                    <FormGroup>
                                        <Label for="source">Source</Label>
                                        <Input type="select" id="source" value={this.state.source} onChange={this.handleChange}>
                                            <option>Salary</option>
                                            <option>Interest On Bank Accounts</option>
                                            <option>Mutual Funds</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="amount">Amount</Label>
                                        <Input type="number" id="amount" value={this.state.amount} onChange={this.handleChange} />
                                    </FormGroup>
                                    <Button type="submit" value="submit" color="primary">Add Income</Button>
                                </Form>    
                            </div>
                            <div className="col-6">
                                <h5>Add New Expense</h5>
                                <Form onSubmit={this.handleExpense}>
                                    <FormGroup>
                                        <Label for="category">Category</Label>
                                        <Input type="select" id="category" value={this.state.category} onChange={this.handleChange}>
                                            <option>Food</option>
                                            <option>Party</option>
                                            <option>Education</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="expense">Amount</Label>
                                        <Input type="number" id="expense" value={this.state.expense} onChange={this.handleChange} />
                                    </FormGroup>
                                    <Button type="submit" value="submit" color="primary">Add Expense</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard