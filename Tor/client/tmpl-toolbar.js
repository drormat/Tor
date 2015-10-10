Template.toolbar.events({
'click #btnAddNav' : function(e){
    changeToAddScreen();
  },
'click #btnJoinNav' : function(e){
    changeToJoinScreen()
  }
});

function changeToAddScreen(){
  var addBtn = $('#btnAddNav');
  var joinBtn = $('#btnJoinNav');
  var myView = document.getElementById("myQueuesView");
  var myJoined = document.getElementById("regQueuesView");

  joinBtn.removeClass("selected");
  myJoined.style.display = 'none';
  addBtn.addClass("selected"); 
  myView.style.display = 'block';
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


