/*eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51JYWu9L3ZRxFfB6uKp3RrmFDqK8oh9mOfgCFdJ2L0zpRV6m87uY5QvRNljLvMtce8HNNjp0xaswOmejoNGKLDmVp00wqPIG3kw'
);

export const bookTour = async tourId => {
  try {
    // get checkout session
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    //console.log(session);
    //create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
