import React, { useState } from 'react';
import { Button, Modal, ModalFooter, Form, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/thunk';

const RegisterModal = (props: any) => {
    const { buttonLabel, className } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = e.currentTarget.username.value;
        // const formData = new FormData(document.querySelector('form')!);
        // formData.username = username;
        const toBackendData = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
            chiName: e.currentTarget.chiName.value,
            engName: e.currentTarget.engName.value,
            telephone: e.currentTarget.telephone.value,
            email: e.currentTarget.email.value,
            sex: 'M',
        };
        dispatch(register(toBackendData));
    };

    return (
        <div>
            <Button color={'success'} onClick={toggle}>
                {buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <Form onSubmit={handleSubmit}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="chiName">Chinese Name</Label>
                                <Input type="text" name="chiName" id="chiName" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="engName">English Name</Label>
                                <Input type="text" name="engName" id="engName" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="telephone">Telephone</Label>
                                <Input type="text" name="telephone" id="telephone" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button color="primary" onSubmit={toggle}>
                        提交
                    </Button>
                </Form>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default RegisterModal;
