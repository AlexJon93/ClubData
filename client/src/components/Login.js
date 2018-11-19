import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            club: "",
            password: "",
            signup: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        if(this.state.signup) {
            axios.post('http://localhost:5000/users', {
                email: this.state.email,
                club: this.state.club,
                password: this.state.password
            })
                .then(res => {
                    alert(res.data.message);
                });
        } else {
            console.log('logging in');
            axios.post('http://localhost:5000/users/login', {
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    if(res.data.token && res.data.token !== undefined) {
                        cookies.set('jwt', res.data.token);
                        this.props.onLogin(true);
                    } else {
                        console.log(res);
                        alert('There was an issue logging in. Check email/password and try again');
                    }
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
        e.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input 
                    type="email"
                    name="email"
                    onChange={this.handleChange}/>
                </label>
                <label>
                    Password:
                    <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}/>
                </label>
                { this.state.signup &&
                    <label>
                        Club Name:
                        <input
                        type="text"
                        name="club"
                        onChange={this.handleChange}/>
                    </label>
                }
                <label>
                    Sign-Up?
                    <input
                    type="checkbox"
                    name="signup"
                    checked={this.state.signup}
                    onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default Login