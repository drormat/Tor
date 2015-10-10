Router.route('/api',
           { where:'server'
           })
.get(function(){
  //write headers
  writeHeaders(this);
  //send our response
  this.response.end('GET is not supported. Sorry! \n');
})
.post(function(){
  writeHeaders(this);
  // check to see if an email address was sent...
  var useremail = this.request.body.email;
  if (!useremail){
    this.response.end('No user specified...\n');
    return;
  }
  // check to see if the user exists...
  var user = Meteor.users.findOne({
    emails:{
      $elemMatch : {
        address: useremail
      }
    }
  });
  
  if (!user){
    this.response.end('User not found...\n');
    return;
  }
  
  var records = Snippets.find({owner:user._id}).fetch();
  this.response.end(JSON.stringify(records));
})
.put(function(){
  writeHeaders(this);
  // check to see if change parameters were specified
  var record = this.request.body.update;
  if (!record){
    this.response.end('Nothing requested...\n');
    return;
  }
  var update = Snippets.upsert({
    _id:record.id
  }, {
    $set : record.changes
  });
  console.log(update);
  this.response.end('Snippet Updated');
  
})
.delete(function(){
  writeHeaders(this);
  //check to see if an ID was sent for deletion...
  var recID = this.request.body.snippetID;
  if(!recID){
    this.response.end('No ID submitted...\n');
    return;
  }
  var del = Snippets.remove({_id:recID});
  console.log(del);
  this.response.end('Snippet deleted!\n');
})

function writeHeaders(self){
  self.response.statusCode = 200;
  self.response.setHeader("Content-Type","application/json");
  self.response.setHeader("Access-Control-Allow-Origin", "*");
  self.response.setHeader("Access-Control-Allow-Headers",
                          "Origin, X-Requested-With, Content-Type, Accept");
}