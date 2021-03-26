import React, { Component } from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';

const { REACT_APP_API_SERVER } = process.env;

interface CheckoutFormProps {}

class CheckoutForm extends Component<
    CheckoutFormProps & ReactStripeElements.InjectedStripeProps,
    {}
> {
    constructor(props: any) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    async submit() {
        let { token } = await this.props.stripe!.createToken({ type: 'card', name: 'Franky' });
        try {
            let response = await fetch(`${REACT_APP_API_SERVER}/charge`, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                // body: token!.id,
                body: '99',
            });

            if (response.ok) {
                this.setState({ complete: true });
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Purchase</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
