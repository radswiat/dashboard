import * as React from 'react';
import authService from './auth.service';
import Link from 'valuelink';


class Auth extends React.Component<{}, {}> {

    state: any = {
        username: '',
        password: ''
    }

    constructor() {
        super();
    }

    login(e) {
        e.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password
        };
        console.error('credentials');
        console.info(credentials);
        authService.login(credentials);
    }

    render() {
        return (
            <form role='form'>
                <fieldset className='form-group'>
                    <input type='text' placeholder='Username' valueLink={ Link.state(this, 'username') }/>
                    <input type='text' placeholder='Password' valueLink={ Link.state(this, 'password') }/>
                </fieldset>
                <button type='submit' onClick={this.login.bind(this)}>Submit</button>
            </form>
        );
    }
}

export {Auth};

