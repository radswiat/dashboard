/// <reference path="../../../../../typings/index.d.ts" />
import {deepOrange500} from 'material-ui/styles/colors';
require('../../../index.html');
require('!style!css!sass!./assets/scss/main.scss');
import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
// import * as MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Auth} from '../../components/auth/auth.component';
import {getMuiTheme} from 'material-ui/styles';
import {AppNavigation} from '../app-navigation/app-navigation';
// require('!style!css!sass!./app.scss');

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

interface HelloProps { compiler: string; framework: string; }
class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppNavigation></AppNavigation>
                    <h1>Real Time Dashboard</h1>
                    <Auth></Auth>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Hello compiler='TypeScript' framework='React'/>,
    document.getElementById('app')
);