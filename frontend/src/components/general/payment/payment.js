import { React } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./paymentForm";

const PUBLIC_KEY = "pk_test_51OtcXrHbhuikqEEreUTvZU3T5DGOkgz97kRncQE0vGtDfDl4FfC9xlBGMLFo06h2RJlwTy4t39HN6JVPsJrCXhhA00kygQsUo3";
const stripeTestPromise = loadStripe(PUBLIC_KEY);
const stripe = await loadStripe(PUBLIC_KEY);

const appearance = {
	theme: 'stripe'
};

const elements = stripe.elements({PUBLIC_KEY, appearance});

function Payment({ orderId }) {
	return (
		<Elements stripe={stripeTestPromise} elements={elements}>
			<PaymentForm orderId={orderId}/>
		</Elements>
	);
}

export default Payment;