const firebaseConfig = {
  apiKey: "AIzaSyAJ61CR4hcHajBf8T02wl-REVx8SnRxklE",
  authDomain: "useradmin-cd653.firebaseapp.com",
  databaseURL: "https://useradmin-cd653-default-rtdb.firebaseio.com",
  projectId: "useradmin-cd653",
  storageBucket: "useradmin-cd653.appspot.com",
  messagingSenderId: "51017691764",
  appId: "1:51017691764:web:9f322ae1ee6c00c5ce5721",
};
firebase.initializeApp(firebaseConfig);

function selectAllData() {
  //Call Data
  var user = document.getElementById('getUsername');
  var pass = document.getElementById('getPassword');
  firebase
    .database()
    .ref(`salamom/` + `users/`)
    .once("value", function (usersRecord) {
      usersRecord.forEach(function (data) {
        var id = data.val().id;
        var username = data.val().username;
        var sex = data.val().sex;
        var grade = data.val().grade;
        var password = data.val().password;
        console.log(username,password);
        document.getElementById('loginBtn').addEventListener('click', () => {
          if (user.value == username) {
            if (pass.value == password) {
              window.location.replace('new-student.html')
              localStorage.setItem('dbName',username);
              localStorage.setItem('dbGrade',grade);
            }
          }
        })
      });
    });

}

window.onload = selectAllData;