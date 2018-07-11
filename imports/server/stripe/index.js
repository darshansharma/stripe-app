
import Stripe from 'stripe';


let stripe = Stripe("sk_test_eettRFEjEoHvDoplsv5imcnO");


export const createCharge = (charge) =>
stripe.charges.create(charge);

export const createCustomer = customer =>
stripe.customers.create(customer);
