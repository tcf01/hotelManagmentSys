import React from 'react';
import Layout from './Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store from './Component/redux/store';
import { history } from './history';
import { StripeProvider } from 'react-stripe-elements';

const App: React.FC = () => {
    return (
        <StripeProvider apiKey="pk_test_0PC4N2e2PU7r7dPcowgsz7X800xB2RUAmG">
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="App">
                        <Layout />
                    </div>
                </ConnectedRouter>
            </Provider>
        </StripeProvider>
    );
};

export default App;
