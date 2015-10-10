// for our general use
// (we will use specific files as needed, for clarity!)
Meteor.subscribe('queueUsers');
Meteor.subscribe('queues');


Router.configure({
  layoutTemplate: 'main'
});