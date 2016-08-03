require('!style!css!sass!./scss/auth.scss');
import * as React from 'react';
import authService from './auth.service';
import FlatButton from 'material-ui/FlatButton';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import template from './templates/index.rt';

class Auth extends React.Component<{}, {}> {

    state: any = {
        username: '',
        password: '',
        loginInProgress: false,
        loginState: 0,
        open: false
    }

    constructor() {
        super();
    }

    loginBtn(e) {
        e.preventDefault();
        if (this.state.loginState === 0) {
            this.loginBasicStep();
        }else {
            this.loginFinalStep();
        }
    }

    loginBasicStep(e) {
        let credentials = {
            username: this.state.username,
            password: this.state.password
        };
        this.setState({'loginInProgress' : true});
        console.error('credentials');
        console.info(credentials);
        authService.login(credentials).then((data) => {
            this.loginAdvancedStep(data);
        });
    }

    loginAdvancedStep(data) {
        this.setState({loginState: 1, loginInProgress: false, loginAdvancedPassword : data.password});
    }

    loginFinalStep() {
        this.close();
    }

    onLoginFailed() {

    }

    close() {
        this.setState({open: false, loginState: 0});
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

