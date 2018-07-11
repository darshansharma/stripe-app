import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import SimpleSchema from 'simpl-schema';
import _ from 'lodash';

export const Users = new Mongo.Collection('Users');

Users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Users.schema = new SimpleSchema({
  cusId: {type: String},
  email: {type: String , optional: true},
  subscriptions: new SimpleSchema({
    object: {type: String},
    data: [{
      type: new SimpleSchema({

      }),
      optional:true,
    }],
    has_more: {type: Boolean},
    total_count: {type: Number},
    url: {type: String},
  }),
  invoice_prefix: {type: String},
  metadata: {
    type: new SimpleSchema({
    }),
  },
  createdAt: { type: Date, autoValue() { return new Date(); } },
});

Users.attachSchema(Users.schema);
