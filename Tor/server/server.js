// general server-side code
// (will get specific as needed)
Meteor.publish('queues', function(){
   return Queues.find({}); // all queues 
});

Meteor.publish('queueUsers', function(){
   return QueueUsers.find({}); // all queues users
});


Queues.allow({
  insert: function(userId,fields){
    return(userId); // make sure user is logged in.
  },
  update: function(userId,fields){
    return(userId); // same as above - make sure user is logged in.
  },
  remove: function(userId,fields){
      return(userId);
  }
})

QueueUsers.allow({
  insert: function(userId,fields){
    return(userId); // make sure user is logged in.
  },
  update: function(userId,fields){
    return(userId); // same as above - make sure user is logged in.
  }
})
