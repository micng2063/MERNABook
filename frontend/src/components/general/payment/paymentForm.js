import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CartDetail from '../../shoppingCart/CartDetail';
import PaymentType from './paymentType';
import CardNumberField from "./paymentInfo";

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
  "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export default function PaymentForm({ orderId }) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { total } = CartDetail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: e.target.elements.name.value,
        address: {
          line1: e.target.elements.address.value,
          city: e.target.elements.city.value,
          state: e.target.elements.state.value,
          postal_code: e.target.elements.postalCode.value,
        },
      },
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:5050/payment', {
          amount: Math.round(total * 100),
          id,
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
          localStorage.removeItem('shopping-cart');

          const paymentId = id;
          console.log('Payment ID:', paymentId);

          const orderResponse = await fetch(`http://localhost:5050/order/${orderId}`);
          const order = await orderResponse.json();

          const updatedOrder = {
            ...order,
            billingAddress: `${e.target.elements.address.value}, ${e.target.elements.city.value}, ${e.target.elements.state.value}, ${e.target.elements.postalCode.value}`,
            paymentid: paymentId,
          };

          await fetch(`http://localhost:5050/order/${orderId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedOrder),
          });

          await axios.post('http://localhost:5050/email/order', {
            to: order.email,
            subject: 'Order Confirmation',
            order: order,
          });

        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();

  if (success) {
    const maskedOrderId = btoa(orderId);
    navigate(`/order/${maskedOrderId}`);
  }

  return (
    <div>
      <h5 class="section-title position-relative text-uppercase mb-3">
        <span class="bg-secondary pr-3">Payment Method </span>
      </h5>

      <div class="bg-light p-30 mb-5">
        <PaymentType />
        {!success ? (
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <div class="row">
              <div class="col-md-12 form-group">
                <label>Cardholder Name</label>
                <input class="form-control" type="text" name="name" placeholder="Cardholder's Name" required />
              </div>
              <div class="col-md-12 form-group">
                <CardNumberField />
                <div class="form-control">
                  <div class="pt-1">
                    <CardElement options={{ hidePostalCode: true }} />
                  </div>
                </div>
              </div>
              <small class="text-center px-5" style={{ color: "#6c757d", opacity: "0.5" }}>Please only enter "4242 4242 4242 4242" or any test cards for the Info list. We are not responsible if you use real card numbers.
                This is a mock payment, so using test card number will simulate a successful transaction without charging any actual funds.
              </small>
            </div>
            <div class="row pt-1">
              <div class="col-md-6 form-group">
                <label>Address</label>
                <input class="form-control" type="text" name="address" placeholder="Address" required />
              </div>
              <div class="col-md-6 form-group">
                <label>City</label>
                <input class="form-control" type="text" name="city" placeholder="City" required />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 form-group">
                <label>State</label>
                <select className="form-control" name="state">
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div class="col-md-6 form-group">
                <label>ZIP Code</label>
                <input class="form-control" type="text" name="postalCode" placeholder="Postal Code" required />
              </div>
            </div>
            <button className="btn btn-block bg-primary text-white font-weight-bold my-3" type="submit">
              Place Order
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

