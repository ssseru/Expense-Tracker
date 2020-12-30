import React from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Card } from "reactstrap";

class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            listOfUsers: [],
            expenseTransactions: [],
            incomeTransactions: []
        }
        this.handleBack = this.handleBack.bind(this)
        this.renderTransactions = this.renderTransactions.bind(this)
    }
    componentDidMount() {
        axios.get("/user_list",{
            headers: {
              'access_token': this.props.location.state.access_token, 
            }
        })
        .then((response) => {
            this.setState({
                listOfUsers: [...response.data.ans]
            })
            console.log(this.state.listOfUsers)
        }, (error) => {
        alert(error.response.data.message);
        });
    }
    
    handleBack = event => {
        event.preventDefault()
        this.props.history.push({
            pathname: '/dashboard',
            state: { 
                'username': this.props.location.state.username, 
                'access_token': this.props.location.state.access_token,
                'isAdmin': this.props.location.state.isAdmin
            }
        });
    }

    renderTransactions(e) {
        e.preventDefault()
        axios.get("/inc_list",{
            headers: {
              'access_token': this.props.location.state.access_token, 
              'name': e.target.value
            }
        })
        .then((response) => {
            console.log(e.target.value+" "+"Incomes")
            console.log(response.data.ans)
            this.setState({
                incomeTransactions: [...response.data.ans]
            })
        }, (error) => {
        alert(error.response.data.message);
        });
        axios.get("/exp_list",{
            headers: {
              'access_token': this.props.location.state.access_token, 
              'name': e.target.value
            }
        })
        .then((response) => {
            console.log(e.target.value+" "+"Expenses")
            console.log(response.data.ans)
            this.setState({
                expenseTransactions: [...response.data.ans]
            })
        }, (error) => {
        alert(error.response.data.message);
        });
       
    }

    render() {
        const listUsers = this.state.listOfUsers.map((user) =>
            <li><Button onClick={this.renderTransactions} value={user}>{user}</Button></li>
        );
        var renderExpenses = this.state.expenseTransactions.map((x) => <Card style={{background: "#d1c4e9"}}><p>Amount:{x.amount}</p>Source:{x.category}</Card>)
        var renderIncomes = this.state.incomeTransactions.map((x) => <Card style={{background: "#d1c4e9"}}><p>Amount:{x.amount}</p>Source:{x.source}</Card>)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-1">
                        <Button onClick={this.handleBack} color="success">Go back</Button>
                    </div>
                    <div className="col-11">
                        <h3>Admin Page</h3>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-12">
                        <h6>List of users:</h6>
                    </div>
                    <br />
                </div>
                <div className="row">
                    <div className="col-4">
                        <p>{listUsers}</p>
                    </div>
                    <div className="col-4">
                        <h6>List of incomes:</h6>
                        <p>{renderIncomes}</p>
                    </div>
                    <div className="col-4">
                    <h6>List of expenses:</h6>
                        <p>{renderExpenses}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin