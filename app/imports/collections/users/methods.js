import { Meteor } from 'meteor/meteor';
import { Cards } from './index';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { createCustomer, createSubscription } from '/imports/server/stripe/index';
import { Promise } from 'meteor/promise';
import { Users } from '/imports/collections/users/index';

export const AddCustomerInDatabase = new ValidatedMethod({
  name: 'users.AddCustomer',
  validate: new SimpleSchema({
    email: {type: String, optional: true},
}).validator(),
  run({email}){
    const data = {email};
    const customer = Promise.await(createCustomer(data));
    console.log(customer.id);
    const d = {cusId: customer.id, email: customer.email, subscriptions: customer.subscriptions, invoice_prefix: customer.invoice_prefix, metadata: customer.metadata};
    Users.insert(d);
  }
});


export const CreateSubscription = new ValidatedMethod({
  name: 'users.subscribeMonthly',
  validate: new SimpleSchema({
    plan: {type: String},
  }).validator(),
    run({plan}){
      const data = {plan};
    cusId = Users.find({}, {sort: {createdAt: -1} }).fetch()[0].cusId;
    console.log(cusId);
    const items = [ { plan }];
    const subscription = Promise.await(createSubscription({
      customer: cusId,
      items,
    }));
    console.log("---------------------------------------------------------------------");
    console.log(subscription);
    console.log("---------------------------------------------------------------------");

  }
});
