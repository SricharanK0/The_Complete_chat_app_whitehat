//YOUR FIREBASE LINKS
const firebaseConfig = {
    apiKey: "AIzaSyCaDiL9ICBqhrDZnYtoGDOjxVeHsmARiCw",
    authDomain: "kwitter-37e8d.firebaseapp.com",
    databaseURL: "https://kwitter-37e8d-default-rtdb.firebaseio.com",
    projectId: "kwitter-37e8d",
    storageBucket: "kwitter-37e8d.appspot.com",
    messagingSenderId: "559621896830",
    appId: "1:559621896830:web:552b8904fe9c2e3c90762f"
  };
firebase.initializeApp(firebaseConfig);
room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
console.log("Hello1")
name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>"
message_with_tag="<h4 class='message_h4'>"+message+"</h4>"
console.log("Hello2")
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like"+like+"</span></button><hr>";
console.log("Hello3")
row = name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
    } });  }); }
getData();

function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });
    document.getElementById("msg").value="";
}

function updateLike(message_id){
    console.log("clicked on like button-"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes)+1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
          like:updated_likes
    })
}
function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
}