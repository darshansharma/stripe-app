import { Meteor } from 'meteor/meteor';
import { Cards } from './index';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Promise } from 'meteor/promise';
import { Users } from '/imports/collections/users/index';
import { createCustomer, createSubscription, createSource } from '/imports/server/stripe/index';

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
    tokenId: {type: String}
}).validator(),
run({cardId, name, exp_month, exp_year, brand, country, last4, tokenId}){
    const data = {cardId, name, exp_month, exp_year, brand, country, last4};
    Cards.insert(data);
    cusId = Users.find({}, {sort: {createdAt: -1} }).fetch()[0].cusId;
    Promise.await(createSource(cusId,{source: tokenId}));
}
});
