import * as React from 'react';
import authService from './auth.service';
import Link from 'valuelink';
require('!style!css!sass!./scss/auth.scss');
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Auth extends React.Component<{}, {}> {

    state: any = {
        username: '',
        password: '',
        open: false
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

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div className='comp-auth'>
                <FlatButton label='Login' onTouchTap={ () => { this.setState({open: true}); }} />
                <Dialog
                    title='Dialog With Actions'
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={ () => { this.setState({open: false}); } }
                >
                    <form role='form'>
                        <fieldset className='form-group'>
                            <input type='text' placeholder='Username' valueLink={ Link.state(this, 'username') }/>
                            <input type='text' placeholder='Password' valueLink={ Link.state(this, 'password') }/>
                        </fieldset>
                        <button type='submit' onClick={this.login.bind(this)}>Submit</button>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export {Auth};

