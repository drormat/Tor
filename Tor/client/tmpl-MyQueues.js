Template.myQueues.helpers({
  myQueues : function() {
    return Queues.find({owner:Meteor.userId()}).fetch();
  }
});

Template.myQueue.helpers({
  myQueue : function() {
    return QueueUsers.find({identityKey:this.identityKey,visited:false}).fetch();
  }
});

Template.myQueues.events({
  'click #btnAdd' : function(e){
    addQueue();
  },
  'keypress #txtAdd' : function(e){
    if (e.keyCode!=13) return;
    addQueue();
  }
});

Template.myQueue.events({
  'click .del-btn' : function(e){
    var unvisitedUsers = QueueUsers.find({identityKey:this.identityKey,visited:false}).fetch();
    for (var i = 0, len = unvisitedUsers.length; i < len; i++) {
        QueueUsers.update({_id:unvisitedUsers[i]._id},{$set:{visited:true}});
    } 
   // QueueUsers.update({identityKey:this.identityKey,visited:false},{$set:{visited:true}});
    Queues.remove({_id:this._id});
    
  }
});

function addQueue(){
  var txtNode = $('#txtAdd');
  if (!txtNode || !txtNode.val() || !Meteor.userId()) return;
  var idKey = createQueueIdKey(txtNode.val);
  Queues.insert({
    owner:Meteor.userId(),
    identityKey: idKey,
    name:txtNode.val()});
  txtNode.val('');
}

function createQueueIdKey(newQueueName){
  var idKey = (Math.floor(Math.random()*9000000) + 1000000).toString();
  var getQueue = Queues.findOne({identityKey:idKey});
  if(getQueue){
     if(getQueue.name === newQueueName) {return;} //this Queue is already exist
     else{
         createQueueIdKey(newQueueName);
     }
  }
  else{
   return idKey;   
  }
    
}

