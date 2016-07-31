/// <reference path="../../../../../typings/index.d.ts" />
import * as React from 'react';
import AuthService from './auth.service';

export class Auth extends React.Component<{}, {}> {

    state: any = {
        email: '',
        password: ''
    }

    constructor(props) {
        super(props);
    }

/*    login (e) {
        e.preventDefault();
        console.warn('Auth:login()');
        console.info(AuthService);
        AuthService.login();
    }*/


    handleEmailChange (e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange (e) {
        this.setState({password: e.target.value});
    }

    handleLogin (e) {
        e.preventDefault();
        let credentials = {
            email : this.state.email,
            password: this.state.password
        };
        console.log(this.state.email);
        console.log(this.state.password);
        AuthService.login(credentials);
    }

    render() {
        return (
            <form role='form'>
                <fieldset className='form-group'>
                    <input type='text' placeholder='Username' onChange={this.handleEmailChange.bind(this)} />
                    <div className='validation' id='username'>Error</div>
                    <input type='password' placeholder='Password' onChange={this.handlePasswordChange.bind(this)} />
                </fieldset>
                <button type='submit' onClick={this.handleLogin.bind(this)}>Submit</button>
            </form>
        );
    }
}





