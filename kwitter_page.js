// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDjlKMJyShl0dP-6LJHERFdk-33PYX-hG0",
    authDomain: "kwitter-defdb.firebaseapp.com",
    databaseURL: "https://kwitter-defdb-default-rtdb.firebaseio.com",
    projectId: "kwitter-defdb",
    storageBucket: "kwitter-defdb.appspot.com",
    messagingSenderId: "544447091945",
    appId: "1:544447091945:web:066445d2b028a4d6cd4c78"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name= localStorage.getItem("user_name");
  room_name= localStorage.getItem("room_name");
  document.getElementById("group_name").innerHTML= "<b>" + room_name + "</b>";

  function send() {
      msg= document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
      name:user_name,
      Message:msg,
      like:0
      });
      document.getElementById("msg").value= "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name= message_data['name'];
message= message_data['Message'];
like= message_data['like'];
name_with_tag= "<h4>" + name + "<img class= 'user_tick' src='tick.png'></h4>";
message_with_tag= "<h4 class='message_h4'>" + message + "</h4>";
like_buttton= "<button class= 'btn btn-primary' id="+firebase_message_id+" value="+like+" onclick= 'updatelike(this.id)'>";
span_with_tag= "<span class= 'glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
console.log(message_with_tag);
row= name_with_tag + message_with_tag + like_buttton + span_with_tag;
document.getElementById("output").innerHTML+= row;

//End code
      } });  }); }
getData();

function updatelike(message_id) 
{
console.log("clicked on like button- " + message_id);
button_id= message_id;
likes= document.getElementById(button_id).value;
updated_likes= Number(likes) + 1;
console.log(updated_likes);

firebase.database().ref(room_name).child(message_id).update({
like : updated_likes
});

}

function logout() {
localStorage.removeItem("room_name");
localStorage.removeItem("user_name")
window.location.replace("index.html");
}

