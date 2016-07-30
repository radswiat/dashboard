import * as React from 'react';
import AuthService from './auth.service';


interface IAuth { compiler: string; framework: string; }

export class Auth extends React.Component<IAuth, {}> {

    constructor(props) {
        super(props);
    }

    login (e) {
        e.preventDefault();
        console.warn('Auth:login()');
        console.info(AuthService);
        AuthService.login();
    }

    render() {
        return (
            <form role='form'>
                <div className='form-group'>
                    <input type='text' placeholder='Username' />
                    <input type='password' placeholder='Password' />
                </div>
                <button type='submit' onClick={this.login.bind(this)}>Submit</button>
            </form>
        );
    }
}

