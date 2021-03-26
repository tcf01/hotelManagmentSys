import React from 'react';
import { Homepage } from './Component/Homepage/Homepage';
import { RouteComponentProps, Switch, Route, withRouter } from 'react-router';
import { Profile } from './Component/Profile/Profile';
import { Login } from './Component/Login/Login';
import Hotel from './Component/Hotel/Hotel';
import Navbar from './Component/Navbar/Navbar';
import store from './Component/redux/store';
import HotelDetailPage from './Component/HotelDetailPage/HotelDetailPage';
import BookingRecord from './Component/BookingRecord/BookingRecord';

class Layout extends React.Component<{} & RouteComponentProps<{}>> {
    restoreLogin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            store.dispatch({ type: '@@auth/GET_RESTORED_USER' });
        }
    };

    componentDidUpdate = (
        nextProps: Readonly<{} & RouteComponentProps<{}>>,
        nextState: Readonly<{}>,
        nextContext: any,
    ) => {
        this.restoreLogin();
    };

    componentDidMount(): void {
        this.restoreLogin();
    }

    render = () => {
        return (
            <>
                <Navbar />
                <Switch>
                    <Route path={'/'} exact={true} component={Homepage} />
                    <Route path={'/search'} exact={true} component={Hotel} />
                    <Route path={'/hotel/:id'} exact={true} component={HotelDetailPage} />
                    <Route path={'/bookingRecord/:userId'} exact={true} component={BookingRecord} />
                    <Route path={'/profile'} exact={true} component={Profile} />
                    <Route path={'/login'} exact={true} component={Login} />
                </Switch>
            </>
        );
    };
}

export default withRouter(Layout);
