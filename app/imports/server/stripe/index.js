
import Stripe from 'stripe';


let stripe = Stripe("sk_test_eettRFEjEoHvDoplsv5imcnO");


export const createCharge = (charge) =>
stripe.charges.create(charge);

export const createCustomer = customer =>
stripe.customers.create(customer);

export const createSubscription = subscription =>
stripe.subscriptions.create(subscription);

export const retrieveToken = id =>
stripe.tokens.retrieve(id);

export const createSource = (customerId, {source}) =>
stripe.customers.createSource(customerId, {source});
