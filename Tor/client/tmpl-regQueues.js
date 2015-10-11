Template.regQueues.helpers({
  regQueues : function() {
    var myRegisted =  QueueUsers.find({user:Meteor.userId(),visited:false}).fetch();
    var custumQueuesListv = [];
    for (var i = 0, len = myRegisted.length; i < len; i++) {
        var regQ = Queues.findOne({identityKey:myRegisted[i].identityKey});
        custumQueuesListv.push(regQ);
    }
      changeToJoinScreen();
      return custumQueuesListv;
  }
});

Template.regQueue.helpers({
  regQueue : function() {
    return QueueUsers.find({identityKey:this.identityKey,visited:false}).fetch();
  },
  highlightMyself: function() {
      var username = getUserName();
      var users = $('.list-user');
     for (var i = 0, len = users.length; i < len; i++) {
        var isCurrent = users[i].find('.username').val() == username;
        if(isCurrent)
        {
            users[i].addClass('highlight');
            break;
        }
    } 
  }
});

Template.regQueues.events({
  'click #btnJoin' : function(e){
    joinQueue();
  },
  'keypress #txtJoin' : function(e){
    if (e.keyCode!=13) return;
    joinQueue();
  }
});

function joinQueue(){
  var txtNode = $('#txtJoin');
  var idKey = $('#txtJoin').val();
  if (!txtNode || !txtNode.val() || !Meteor.userId()) return;
  var getQueue = Queues.findOne({identityKey:idKey});
  
    if(getQueue){
    //var userCount = QueueUsers.find({identityKey:idKey,visited:false}).count();
    var isPasswordAccount = Meteor.user().emails;
    var username = getUserName();
    var currentQueue = QueueUsers.find({identityKey:idKey,visited:false}).fetch();
    var userExist = false;
    for (var i = 0, len = currentQueue.length; i < len; i++) {
        if(currentQueue[i].user == Meteor.userId())
        {
            userExist = true;
        }
    }
    if(!userExist){
        QueueUsers.insert({
        user:Meteor.userId(),
        username:username,
        identityKey:txtNode.val(),
        visited:false
        });
    } 
  }
  txtNode.val('');
}
function getUserName(){
    var isPasswordAccount = Meteor.user().emails;
    var username = Meteor.user().profile.name;
    if(isPasswordAccount)
    {
       username = Meteor.user().emails[0].address;
    }
    return username;
}

function getPosition(queueKeyId){
  var userCount = QueueUsers.find({identityKey:idKey}).count();
  return userCount+1;
}

function changeToJoinScreen(){
  var addBtn = $('#btnAddNav');
  var joinBtn = $('#btnJoinNav');
  var myView = document.getElementById("myQueuesView");
  var myJoined = document.getElementById("regQueuesView");
  
  addBtn.removeClass("selected");
  myView.style.display = 'none';
  joinBtn.addClass("selected"); 
  myJoined.style.display = 'block';
}