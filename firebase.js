var firebaseConfig = {
  apiKey: "PASTE_YOUR_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  databaseURL: "https://PROJECT.firebaseio.com",
  projectId: "PROJECT"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();
