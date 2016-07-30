require('../index.html');
import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import {Auth} from './components/auth/auth.component';

interface HelloProps { compiler: string; framework: string; }

class Hello extends React.Component<HelloProps, {}> {
    render() {
        return(
            <div>
                <h1>Real Time Dashboard</h1>
                <Auth></Auth>
            </div>
        );
    }
}

ReactDOM.render(
    <Hello compiler='TypeScript' framework='React' />,
    document.getElementById('app')
);