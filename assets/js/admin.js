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
var adminSec = localStorage.getItem("dbSecretData"); //User name

function selectAllData() {
  //Call Data
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
        showUsers(id, username, sex, grade, password);
        updateUSers(id, username, sex, grade, password);
      });
    });

}

function showUsers(id, username, sex, grade, password) {
  var gUser = document.getElementById('userName');
  var N0 = 0;

  if (!gUser.value) {
    document.getElementById('myUpdate').style.display = 'none';
    document.getElementById('myDelete').style.display = 'none';
  }
  let myTable = document.getElementById('showusers');
  N0++;
  let tt = `
        <td>${N0}</td>
        <td class="text-center"><button style="color:white;border:none;" class="btn btn-outline-dark btn-sm" id="${id}btn" value="${id}">${username}</button></td>
        <td class="text-center">${sex}</td>
        <td class="text-center">${grade}</td>
        <td class="text-center">${password}</td>
        `;
  myTable.innerHTML += tt;

}
function updateUSers(id, username, sex, grade, password) {
  var gUser = document.getElementById('userName');
  var gPass = document.getElementById('userPassword');
  var gGrade = document.getElementById('userGrade');
  var gSex = document.getElementById('userSex');
  var gID = document.getElementById('setUserID');

  const sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds);
    });
    //Update data
    var vv = document.getElementById(`${id}btn`).value;
    document.getElementById(`${id}btn`).addEventListener('click', () => {
      document.getElementById('mySub').style.display = 'none';
      document.getElementById('myUpdate').style.display = 'block';
      document.getElementById('myDelete').style.display = 'block';
      7659876
      gUser.value = username;
      gPass.value = password;
      gGrade.value = grade;
      gSex.value = sex;
      gID.innerText = id;
    })



  };
  document.getElementById('myDelete').addEventListener('click', () => {
    firebase
      .database()
      .ref(`salamom/` + `users/` + gID.innerText)
      .remove();
  })
  sleep(1000);

  document.getElementById('myUpdate').addEventListener('click', () => {
    firebase
      .database()
      .ref(`salamom/` + `users/` + gID.innerText)
      .update({
        username: gUser.value,
        sex: gSex.value,
        grade: gGrade.value,
        password: gPass.value,
      });
  })

}
window.onload = selectAllData;

//Add a new user
document.getElementById('mySub').addEventListener('click', () => {
  var gUser = document.getElementById('userName');
  var gPass = document.getElementById('userPassword');
  var gGrade = document.getElementById('userGrade');
  var gSex = document.getElementById('userSex');
  firebase
    .database()
    .ref(`salamom/` + `users/` + gUser.value)
    .set({
      id: gUser.value,
      username: gUser.value,
      sex: gSex.value,
      grade: gGrade.value,
      password: gPass.value,
    });
});


// //Show and hide password
// const passwordInput = document.getElementById("userPass");
// const togglePassword = document.querySelector(".toggle-password");

// togglePassword.addEventListener("click", function () {
//   if (passwordInput.type === "password") {
//     passwordInput.type = "text";
//     togglePassword.classList.remove("fa-eye");
//     togglePassword.classList.add("fa-eye-slash");
//   } else {
//     passwordInput.type = "password";
//     togglePassword.classList.remove("fa-eye-slash");
//     togglePassword.classList.add("fa-eye");
//   }
// });

///Logout
if (!adminSec) {
  window.location.replace('index.html');
}

document.getElementById('goToPage').addEventListener('click', () => {
  console.log('OKAYYYY');
  window.location.replace('new-student.html')
  localStorage.removeItem("dbSecretData");

})