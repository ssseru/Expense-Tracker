import React from "react"
import {
    Button,
    FormGroup,
    Label,
    Input,
    Form,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardTitle,
    CardBody,
    CardFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import Transactions from "./TransactionsComponent"
import { PieChart } from 'react-minimal-pie-chart';

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount:"",
            source: "Salary",
            category: "Food",
            expense: "",
            totalIncome: "",
            totalExpense: "",
            listofincomes: [],
            listofexpenses: [],
            chartExpenseData: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleIncome = this.handleIncome.bind(this)
        this.handleExpense = this.handleExpense.bind(this)
        this.handleMonthExpense = this.handleMonthExpense.bind(this)
        this.handleMonthIncome = this.handleMonthIncome.bind(this)
        this.handleExpenseChart = this.handleExpenseChart.bind(this)
        this.handleAdmin = this.handleAdmin.bind(this)
    }

    componentDidMount() {
        axios.get("/month_inc",{
            headers: {
              'access_token': this.props.location.state.access_token, 
            }
        })
        .then((response) => {
            this.setState({
                totalIncome: response.data.total,
                listofincomes: [...response.data.ans]
            })
        }, (error) => {
        alert(error.response.data.message);
        });

        axios.get("/month_exp",{
            headers: {
              'access_token': this.props.location.state.access_token, 
            }
        })
        .then((response) => {
            
            this.setState({
                totalExpense: response.data.total,
                listofexpenses: [...response.data.ans]
            })
        }, (error) => {
        alert(error.response.data.message);
        });
    }

    componentDidUpdate() {
        
    }

    handleChange(event) {
        this.setState({
            [event.target.id]:event.target.value
        });
      }

    handleIncome = event => {
        event.preventDefault();
        console.log(this.state.source)
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
        var params = {}
        this.state.category === 'Private' ? params ={
            'category':this.state.category,
            'amount': this.state.expense,
            'private': true ,
        } : params ={
            'category':this.state.category,
            'amount': this.state.expense,
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

    handleMonthExpense = event => {
        event.preventDefault();
        console.log(this.state.listofexpenses)
        axios.get("/month_exp",{
            headers: {
              'access_token': this.props.location.state.access_token, 
            }
        })
        .then((response) => {
            console.log(response.data.ans)
            this.setState({
                totalExpense: response.data.total,
                listofexpenses: [...response.data.ans]
            })
        }, (error) => {
        alert(error.response.data.message);
        });
        
    }
    
    handleMonthIncome = event => {
        event.preventDefault();
        axios.get("/month_inc",{
            headers: {
              'access_token': this.props.location.state.access_token, 
            }
        })
        .then((response) => {
            
            this.setState({
                totalIncome: response.data.total,
                listofincomes: [...response.data.ans]
            })
        }, (error) => {
        alert(error.response.data.message);
        });
    }

    handleExpenseChart = event => {
        event.preventDefault()
        var randomColor = require('randomcolor');
        axios.get("/exp_split",{
            headers: {
              'access_token': this.props.location.state.access_token, 
            }
        })
        .then((response) => {
            console.log(response.data.ans)  
            response.data.ans.forEach(function (element) {
                element.color = randomColor();
            });
            this.setState({
                chartExpenseData: [...response.data.ans]
            })
        })
        console.log(this.state.chartExpenseData)
    }
    
    handleIncomeChart = event => {
        event.preventDefault()
        var randomColor = require('randomcolor');
        axios.get("/inc_split",{
            headers: {
              'access_token': this.props.location.state.access_token, 
            }
        })
        .then((response) => {
            console.log(response.data.ans)  
            response.data.ans.forEach(function (element) {
                element.color = randomColor();
            });
            this.setState({
                chartIncomeData: [...response.data.ans]
            })
        })
    }

    handleAdmin = event => {
        event.preventDefault()
        this.props.history.push({
            pathname: '/admin',
            state: { 
              'username': this.props.location.state.username,
              'access_token': this.props.location.state.access_token,
              'isAdmin': this.props.location.state.isAdmin
            }
        });
    }

    render() {
        const { username, access_token, isAdmin } = this.props.location.state;
        let trans1 , trans2, chartExpense, chartIncome
        if(this.state.listofexpenses) {
            trans2 = <Transactions list={this.state.listofexpenses}/>
        }
        if(this.state.listofincomes) {
            trans1 = <Transactions list={this.state.listofincomes}/>
        }
        if(this.state.chartExpenseData){
            chartExpense =  <PieChart data={this.state.chartExpenseData} radius={30} />
        }
        if(this.state.chartIncomeData){
            chartIncome =  <PieChart data={this.state.chartIncomeData} radius={30} />
        }
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
                    <div className="dashboardHeader row">   
                        <div className='col-4'>
                            <h5>Username: {username}</h5>
                        </div>
                        <div className='col-2'>
                            {isAdmin == true ? <Button onClick={this.handleAdmin} type="button" color="info" >AdminGOD</Button> : <p></p>}
                        </div>
                        <div className="col-3">
                            <p><b>Total Income:</b> {this.state.totalIncome}</p>
                        </div>
                        <div className="col-3">
                            <p><b>Total Expense:</b> {this.state.totalExpense}</p>
                        </div>
                        {/* <p className="forToken">Access Token: {access_token}</p> */}
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <Card>
                                <CardTitle><h3>Add New Income</h3></CardTitle>
                                <CardBody>
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
                                    <CardFooter><Button type="submit" value="submit" color="success">Add Income</Button></CardFooter>
                                </Form>    
                                </CardBody>
                                </Card>
                            </div>
                            <div className="col-6">
                                <Card>
                                <CardTitle><h3>Add New Expense</h3></CardTitle>
                                <CardBody>

                                <Form onSubmit={this.handleExpense}>
                                    <FormGroup>
                                        <Label for="category">Category</Label>
                                        <Input type="select" id="category" value={this.state.category} onChange={this.handleChange}>
                                            <option>Food</option>
                                            <option>Party</option>
                                            <option>Education</option>
                                            <option>Private</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="expense">Amount</Label>
                                        <Input type="number" id="expense" value={this.state.expense} onChange={this.handleChange} />
                                    </FormGroup>
                                    <CardFooter><Button type="submit" value="submit" color="danger">Add Expense</Button></CardFooter>
                                </Form>
                                </CardBody>
                                </Card>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                <Button onClick={this.handleMonthIncome} type="button" color="success">Update Income History</Button>
                            </div>
                            <div className="col-6">
                                <Button onClick={this.handleMonthExpense} type="button" color="danger">Update Expense History</Button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <h3>History of Incomes:</h3> 
                                {trans1}
                            </div>
                            <div className="col-6">
                                <h3>History of Expenses:</h3>
                                {trans2}
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <Button onClick={this.handleIncomeChart} type="button" color="info">Generate Pie Chart for Incomes</Button>
                                {chartIncome}
                            </div>
                            <div className="col-6">
                                <Button onClick={this.handleExpenseChart} type="button" color="info">Generate Pie Chart for Expenses</Button>
                                {chartExpense}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard