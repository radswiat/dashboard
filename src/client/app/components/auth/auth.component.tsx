/// <reference path="../../../../../typings/index.d.ts" />
import * as React from 'react';
import authService from './auth.service';
import * as LinkedStateMixin from 'react-addons-linked-state-mixin';
import * as reactMixin from 'react-mixin';
// import * as Link from 'valuelink';
// import {Input} from 'valuelink/tags.js';


class Auth extends React.Component<{}, {}> {

    // mixins:[LinkedStateMixin];
    linkState: any;

    state: any = {
        username: '',
        password: ''
    }


    constructor() {
        super();
        console.error('auth');
        console.info(this);
    }

    handleLogin(e) {
        e.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password
        };
        console.info(credentials);
        authService.login(credentials);
    }

    render() {
        return (
            <form role='form'>
                <fieldset className='form-group'>
                    <input type='text' placeholder='Username' valueLink={this.linkState('username')}/>
                    <input type='text' placeholder='Password' valueLink={this.linkState('password')}/>
                </fieldset>
                <button type='submit' onClick={this.handleLogin.bind(this)}>Submit</button>
            </form>
        );
    }
}

// We’re using the mixin `LinkStateMixin` to have two-way databinding between our component and the HTML.
reactMixin(Auth.prototype, LinkedStateMixin);

export {Auth};

