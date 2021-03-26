import React, { useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../redux/store';
import { login } from '../redux/auth/thunk';
import $ from 'jquery';
import { push } from 'connected-react-router';
import RegisterModal from '../Register/RegisterModal';
import { Modal } from 'reactstrap';

export function Login(props: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginState = useSelector((state: IRootState) => state.auth.isLogin);
    const dispatch = useDispatch();

    const onchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.className === 'username'
            ? setUsername(event.target.value)
            : setPassword(event.target.value);
    };

    return (
        <div className={'loginWrapper'}>
            <Modal isOpen={props.isOpen} toggle={props.toggle}>
                <div className="content">
                    <div className="headerLogo">
                        <img src="http://bit.ly/2LueoPO" alt="" />
                    </div>
                    <div className="errorMsg"></div>
                    <div className="username">
                        用戶名稱：
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            onChange={onchangeHandler}
                            className={'username'}
                        />
                    </div>
                    <div className="password">
                        密碼：
                        <input
                            type="password"
                            value={password}
                            onChange={onchangeHandler}
                            placeholder="Enter password"
                            className={'password'}
                        />
                    </div>
                    <div className="buttonGroups">
                        <button
                            onClick={() => {
                                if (password === undefined || password === '') {
                                    $('.errorMsg')!.text('please fill in all the information');
                                    return;
                                } else {
                                    dispatch(login(username, password));
                                    dispatch(push('/'));
                                }
                            }}
                        >
                            Login
                        </button>
                        <RegisterModal buttonLabel={'註冊'} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
