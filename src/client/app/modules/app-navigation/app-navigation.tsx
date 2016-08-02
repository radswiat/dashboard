import * as React from 'react';
import {Auth} from '../../components/auth/auth.component';
require('!style!css!sass!./assets/scss/app-navigation.scss');

class AppNavigation extends React.Component<{}, {}> {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='module-app-navigation'>
                <ul>
                    <li>Logo</li>
                    <li className="right">
                        <Auth></Auth>
                    </li>
                </ul>
            </div>
        );
    }
}

export {AppNavigation};

