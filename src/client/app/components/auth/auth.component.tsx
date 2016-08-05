require('!style!css!sass!./scss/auth.scss');
import * as React from 'react';
import authService from './auth.service';
import FlatButton from 'material-ui/FlatButton';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import template from './templates/index.rt';

class Auth extends React.Component<{}, {}> {

    state: any = {
        // dialog status
        open: false,
        // login generat
        loginInProgress : false,
        loginState : 1,
        // login basic
        username : '',
        password : '',
        // login advanced
        requestedPassword : null,
        providedPasswordKeys : {}
    }

    constructor() {
        super();
    }

    /**
     * Handle login button
     * @param e
     */
    loginBtn(e) {
        e.preventDefault();
        if (this.state.loginState === 1) {
            this.doLoginBasic();
        }else if(this.state.loginState === 2) {
            this.doLoginAdvanced();
        }
    }

    /**
     * Login basic - step 0,
     * username & password
     * @param e
     */
    doLoginBasic() {
        let credentials = {
            username: this.state.username,
            password: this.state.password
        };
        this.setState({'loginInProgress' : true});
        // when ready
        authService.login(credentials).then((data) => {
            this.setState({
                loginState: 2,
                loginInProgress: false,
                requestedPassword : data.password
            });
        }, this.onLoginFailed.bind(this));
    }

    /**
     * Login advances - step 1
     * password by requested keys
     */
    doLoginAdvanced() {
        console.warn('doLoginAdvanced');
        console.log(this.state.providedPasswordKeys);
        authService.loginAdvanced(this.state.providedPasswordKeys).then(() => {
            console.warn('doLoginAdvanced:success');
            this.close();
        }, () => {
            console.warn('doLoginAdvanced:failed');
        });
    }

    /**
     * Handle each password key
     * merge them with existing keys
     * @param id
     * @param e
     */
    handlePasswordKey(id, e) {
        let t = {};
        t[id] = e.target.value;
        let mergedProvidedPasswordKeys = _.merge(this.state.providedPasswordKeys, t);
        this.setState({providedPasswordKeys : mergedProvidedPasswordKeys});
    }

    onLoginFailed(data) {
        console.error('failed login');
        console.info(data);
        this.setState({
            loginState: 0,
            loginInProgress: false,
            loginErrorMessage : data.message
        });
    }

    close() {
        this.setState({
            open: false,
            loginState: 1
        });
    }



    render() {

        this.progressStyles = {
            'textAlign' : 'center'
        }

        this.dialogActions = [
            <FlatButton
                label='Log in'
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.loginBtn.bind(this)}
            />,
        ];

        template.bind(this);
        return template.apply(this);
    }
}

export {Auth};




// // @render decorator
// export function render(fn) {
//     return function(target) {
//         target.prototype["render"] = fn;
//     }
// // }
//         return (
//             <div className='comp-auth'>
//                 <FlatButton label='Login' onTouchTap={ () => { this.setState({open: true}); }} />
//                 <Dialog
//                     title='Dialog With Actions'
//                     actions={actions}
//                     modal={false}
//                     open={this.state.open}
//                     onRequestClose={ () => { this.setState({open: false}); } }
//                 >
//                     <form role='form'>
//                         <fieldset className='form-group'>
//                             <input type='text' placeholder='Username' valueLink={ Link.state(this, 'username') }/>
//                             <input type='text' placeholder='Password' valueLink={ Link.state(this, 'password') }/>
//                         </fieldset>
//                         <button type='submit' onClick={this.login.bind(this)}>Submit</button>
//                     </form>
//                 </Dialog>
//             </div>
//         );
//     }
// }
//
// export {Auth};

