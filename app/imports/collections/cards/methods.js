import { Meteor } from 'meteor/meteor';
import { Cards } from './index';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
//import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import SimpleSchema from 'simpl-schema';
import { createCustomer } from '/imports/server/stripe/index';
import { Promise } from 'meteor/promise';

export const addCardInDatabase = new ValidatedMethod({
  name: 'cards.AddCardInDatabase',
  validate: new SimpleSchema({
    cardId: {type: String},
    name: {type: String},
    exp_month: {type: String},
    exp_year: {type: String},
    brand: {type: String},
    country: {type: String},
    last4: {type: String},
}).validator(),
run({cardId, name, exp_month, exp_year, brand, country, last4}){
    const data = {cardId, name, exp_month, exp_year, brand, country, last4};
    console.log("Hi there!!!");
    Cards.insert(data);
}
});

export const addCustomer = new ValidatedMethod({
  name: 'cards.AddCustomer',
  validate: new SimpleSchema({
    email: {type: String},

}).validator(),
run({email}){
    const data = {email};
    const customer = Promise.await(createCustomer(data));
    console.log(customer);
}
});
