Template.queueUser.helpers({
  highlighted: function() {
    var username = getUserName();
    if(username == this.username)
    {
        return "highlighted";   
    }
    return "";
  },
  canDelete:function(){
    var queue = Queues.findOne({identityKey:this.identityKey});
    return (Meteor.userId() == queue.owner || getUserName() == this.username)
  },
  position:function(){
    var usersList = QueueUsers.find({identityKey:this.identityKey,visited:false}).fetch();
     for (var i = 0, len = usersList.length; i < len; i++) {
        if(this._id == usersList[i]._id){
            return i+1;
        }
    } 
}
});

Template.queueUser.events({
  'click .x-btn' : function(e){
     QueueUsers.update({_id: this._id}, {$set:{visited:true}});
  },
  'keypress #txtJoin' : function(e){
    if (e.keyCode!=13) return;
    joinQueue();
  }
});

function getUserName(){
    var isPasswordAccount = Meteor.user().emails;
    var username = Meteor.user().profile.name;
    if(isPasswordAccount)
    {
       username = Meteor.user().emails[0].address;
    }
    return username;
}