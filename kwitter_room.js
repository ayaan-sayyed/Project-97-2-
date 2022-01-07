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
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML= " Welcome " + user_name + "!";

function addRoom() {
room_name= document.getElementById("room_name").value;
firebase.database().ref("/").child(room_name).update({
purpose : "adding room name"
});
localStorage.setItem("room_name", room_name);
window.location= "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Name - " + Room_names);
      row= "<div class= 'room_name' id="+Room_names+" onclick= 'redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML += row;

      //End code
      });});}

getData();

function redirectToRoomName(name) {
console.log(name);
localStorage.setItem("room_name", name);
window.location= "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location= "index.html";
  }

  