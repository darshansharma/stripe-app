import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import SimpleSchema from 'simpl-schema';
import _ from 'lodash';

export const Cards = new Mongo.Collection('Cards');

Cards.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Cards.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Cards.schema = new SimpleSchema({
  cardId: {type: String},
  name: {type: String},
  exp_month: {type: String},
  exp_year: {type: String},
  brand: {type: String},
  country: {type: String},
  last4: {type: String},
  createdAt: { type: Date, autoValue() { return new Date(); } },
});

Cards.attachSchema(Cards.schema);
