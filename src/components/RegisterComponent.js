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
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            username:"Sai",
            password:"intelligencealliance",
            admin:false ,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]:event.target.value
        });
      }

    handleSubmit = event => {
        event.preventDefault();
        const headers = {
            'username': this.state.username, 
            'password': this.state.password,
            'admin':false
          }
        axios.post('/add_user', {} ,{ headers: headers })
          .then((response) => {
            alert("User has been Created");
            this.props.history.push({
                pathname: '/home',
              });
          }, (error) => {
            alert(error.response.data.message);
          });
    }

    render(){
        return(
            <>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Register</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3 className="pageHead">Register</h3>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="username" id="username" value={this.state.username} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Register</Button>
                    </Form>
                </div>
            </>
        )
    }
}

export default Register