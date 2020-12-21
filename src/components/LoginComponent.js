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

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:"Sai",
            password:"intelligencealliance",
            access_token:"" ,
            isAdmin:"" ,
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
            'password': this.state.password
          }
        axios.post('/login', {} ,{ headers: headers })
          .then((response) => {
            this.setState({access_token : response.data.token, isAdmin: response.data.isAdmin})
            console.log(response.data);
            axios.get("/check_auth",{
              headers: {
                'access_token': this.state.access_token
              }
            })
            .then(auth => {
              this.props.history.push({
                pathname: '/dashboard',
                state: { 
                  'username': this.state.username, 
                  'password': this.state.password,
                  'access_token': this.state.access_token,
                  'isAdmin': this.state.isAdmin
                }
              });
            })
          }, (error) => {
            alert(error.response.data.message);
          });
          
        
    }

    render()
    {   
        return(
          <>
            <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Login</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3 className="pageHead">Login</h3>
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
                  <Button type="submit" value="submit" color="primary">Login</Button>
              </Form>
            </div>
          </>
        )
    }
}

export default withRouter(Login);