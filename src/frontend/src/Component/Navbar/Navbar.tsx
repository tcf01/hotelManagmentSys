import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../../assets/images/icon.jpg';

import './navbar.css';
import { Login } from '../Login/Login';
import '../tsFiles/navbar.ts';
import store, { IRootState } from '../redux/store';

import jwtDecode from 'jwt-decode';

export interface INavbarProps {
    isLogin: boolean;
}

export interface NavbarState {
    isOpen: boolean;
}

class Navbar extends React.Component<INavbarProps, NavbarState> {
    constructor(props: INavbarProps) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    setModal = (isOpenState: boolean) => {
        this.setState({
            isOpen: isOpenState,
        });
    };

    toggleLoginPanel = () => this.setModal(!this.state.isOpen);

    handleLoginButton = () => {
        this.props.isLogin ? store.dispatch({ type: '@@auth/IS_LOGOUT' }) : this.toggleLoginPanel();
    };

    render = () => {
        // const jwtToken =
        //     localStorage.getItem('token') !== null ||
        //     localStorage.getItem('token') !== undefined ||
        //     localStorage.getItem('token') !== 'undefined' ||
        //     localStorage.getItem('token') !== 'null'
        //         ? localStorage.getItem('token')
        //         : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwianRsIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.ov489Kx2DbNFg3rGIalgCPmMrIcDB_EHabtVt-fO7FU';
        // debugger;

        // const username = jwtDecode(jwtToken).jtl;

        try {
            return (
                <div className={'navbarPlaceholder'}>
                    <div className={'navbarWrapper'}>
                        <Link to={'/'}>
                            <div className="logo">
                                <img src={Icon} alt="" />
                            </div>
                        </Link>
                        <div className="buttons">
                            <Link to={'/search'}>
                                <div className="button searchSection">
                                    <div className="text">搜尋</div>
                                </div>
                            </Link>
                            <Link
                                to={`/bookingRecord/}  
                                    .jti || ''}`}
                            >
                                <div
                                    className="button bookingRecord"
                                    style={
                                        !this.props.isLogin
                                            ? {
                                                  display: 'none',
                                              }
                                            : { display: 'block' }
                                    }
                                >
                                    <div className="text">預訂記錄</div>
                                </div>
                            </Link>
                            <Link to={'/profile'}>
                                <div
                                    className="button profile"
                                    style={
                                        !this.props.isLogin
                                            ? {
                                                  display: 'none',
                                              }
                                            : { display: 'block' }
                                    }
                                >
                                    <div className="text">個人檔案</div>
                                    {/*<div className="border">/!*style handled by css*!/</div>*/}
                                </div>
                            </Link>
                            <div className="button login" onClick={this.handleLoginButton}>
                                <div className="text">{this.props.isLogin ? '登出' : '登入'}</div>
                                <Login
                                    isOpen={this.state.isOpen}
                                    toggle={this.toggleLoginPanel}
                                />{' '}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } catch (e) {
            console.error(e);
            return <div>There is some problem</div>;
        }
    };
}

const mapStateToProps = (state: IRootState) => {
    return {
        isLogin: state.auth.isLogin,
    };
};
//
// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {};
// };

export default connect(mapStateToProps)(Navbar);
