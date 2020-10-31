import React from "react"
import {
    Button,
    FormGroup,
    Label,
    Input,
    Form
} from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from 'axios';
// const axios_ = axios.create({
//     baseURL: 'http://localhost:5000',
//     headers: { 'Content-Type': 'application/json' },
// })

class Login extends React.Component {
    constructor(props){
        super(props);

        this.state={
            username:"",
            password:"",
            access_token:"" ,
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
        // const data = {
        //     'username': this.state.username, 
        //     'password': this.state.password
        // };
        const headers = {
            // 'Content-Type': 'application/json',
            'username': this.state.username, 
            'password': this.state.password
          }
        axios.post('/login', {} ,{ headers: headers })
          .then((response) => {
            this.setState({access_token : response.data.token})
            console.log(response.data);
            axios.get("/check_auth",{
              headers: {
                'access_token': this.state.access_token
              }
            })
            .then(auth => {console.log(auth)})
          }, (error) => {
            console.log(error.response.data.message);
          });
          
        // this.props.history.push('/dashboard');
        
    }

    render()
    {   
        return(
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
        )
    }
}

export default withRouter(Login);