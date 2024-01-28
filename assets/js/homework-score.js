const firebaseConfig = {
  apiKey: "AIzaSyAJ61CR4hcHajBf8T02wl-REVx8SnRxklE",
  authDomain: "useradmin-cd653.firebaseapp.com",
  databaseURL: "https://useradmin-cd653-default-rtdb.firebaseio.com",
  projectId: "useradmin-cd653",
  storageBucket: "useradmin-cd653.appspot.com",
  messagingSenderId: "51017691764",
  appId: "1:51017691764:web:9f322ae1ee6c00c5ce5721",
};

//Localstorage Sotre Data
document.getElementById("myGrade").addEventListener("change", function () {
  var newGrade = document.getElementById("myGrade").value;
  localStorage.setItem("stdGradeHw", newGrade);
  window.location.reload();
});
document.getElementById("academicYear").addEventListener("change", function () {
  var newYear = document.getElementById("academicYear").value;
  localStorage.setItem("stdYearHw", newYear);
  window.location.reload();
});
document.getElementById("myMonth").addEventListener("change", function () {
  var newMonth = document.getElementById("myMonth").value;
  localStorage.setItem("stdMonthHw", newMonth);
  window.location.reload();
});
document.getElementById("divided").addEventListener("change", function () {
  var newDivided = document.getElementById("divided").value;
  localStorage.setItem("stdDividedHw", newDivided);
  window.location.reload();
});
var dbGrade = localStorage.getItem("stdGradeHw"); //Grade
var dbYear = localStorage.getItem("stdYearHw"); //Year
var dbMonth = localStorage.getItem("stdMonthHw"); //Month
var dbDivid = localStorage.getItem("stdDividedHw"); //Divided
var userGrade = localStorage.getItem("dbGrade"); //User grade
var userName = localStorage.getItem("dbName"); //User name
document.getElementById('setUsername').innerHTML = userName;

//Define class user
var sel = document.getElementById('myGrade');
if (userGrade == '1') {
  let t = `
    <option value="1A">1A</option>
    <option value="1B">1B</option>
  `;
  sel.innerHTML = t;
}
if (userGrade == '2') {
  let t = `
    <option value="2A">2A</option>
    <option value="2B">2B</option>
  `;
  sel.innerHTML = t;
}
if (userGrade == '3') {
  let t = `
    <option value="3A">3A</option>
    <option value="3B">3B</option>
  `;
  sel.innerHTML = t;
}
if (userGrade == '4') {
  let t = `
    <option value="4A">4A</option>
    <option value="4B">4B</option>
  `;
  sel.innerHTML = t;
}
if (userGrade == '5') {
  let t = `
    <option value="5A">5A</option>
    <option value="5B">5B</option>
  `;
  sel.innerHTML = t;
}
if (userGrade == '6') {
  let t = `
    <option value="6A">6A</option>
    <option value="6B">6B</option>
  `;
  sel.innerHTML = t;
}

document.getElementById("myGrade").value = dbGrade;
document.getElementById("academicYear").value = dbYear;
document.getElementById("myMonth").value = dbMonth;
document.getElementById("divided").value = dbDivid;

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const usersRef = database.ref('users');
const postsRef = database.ref(`${dbGrade}/` + `${dbYear}/`);
//Input data November
if (dbMonth == 'red') {
  postsRef.on('value', (snapshot) => {
    stdN0 = 0;
    stdN0TEst = 0;
    snapshot.forEach(function (CurrentRecord) {
      var id = CurrentRecord.val().id;
      var name = CurrentRecord.val().name;
      var sex = CurrentRecord.val().sex;
      var grade = CurrentRecord.val().grade;
      var myKh = CurrentRecord.val().myKh;
      var url = CurrentRecord.val().urlImg;
      var score = CurrentRecord.val().scoreNov;
      var speaking = CurrentRecord.val().speakingNov;
      var writing = CurrentRecord.val().writingNov;
      var listening = CurrentRecord.val().listeningNov;
      var reading = CurrentRecord.val().readingNov;
      var h = CurrentRecord.val().hNov;

      let showTable = document.getElementById("showInput5a");
      let showTableView = document.getElementById("showView");
      let noSp = id.replace(/\s+/g, "");
      let noSpname = noSp + "edit";
      if (!score) {
        score = '0'
      }
      if (!speaking) {
        speaking = '0'
      }
      if (!writing) {
        writing = '0'
      }
      if (!listening) {
        listening = '0'
      }
      if (!reading) {
        reading = '0'
      }
      if (!h) {
        h = '0'
      }
      let table = `
          <td class="table-bordered border-dark text-center">
          <button data-bs-toggle="modal" data-bs-target="#newStdModal" type="button" class="btn btn-success text-center btn-sm" value="${id}" id="${noSpname}ed"><ion-icon name="create-outline"></ion-icon></button>
          </td>
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" contenteditable id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" contenteditable id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" contenteditable id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" contenteditable id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" contenteditable id="${noSp}hw">${h}</td>
          `;
      let tableView = `
          <td class="table-bordered border-dark text-center">${++stdN0TEst}</td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
      showTable.innerHTML += table;
      showTableView.innerHTML += tableView;

      const sleep = async (milliseconds) => {
        await new Promise((resolve) => {
          return setTimeout(resolve, milliseconds);
        });
        //Update data
        //Score
        document.getElementById(`${noSp}score`).addEventListener('input', () => {
          var ss = document.getElementById(`${noSp}score`).innerHTML;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              scoreNov: ss,
            });

        })
        //Speaking
        document.getElementById(`${noSp}speak`).addEventListener('input', () => {
          var ss = document.getElementById(`${noSp}speak`).innerHTML;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              speakingNov: ss,
            });

        })

      };
      sleep(1000);
    })
  });
}

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
$(function () {
  $('[data-bs-toggle="popover"]').popover();
});

if (dbMonth == 'October') {
  window.onload = octoberData;
}
if (dbMonth == 'November') {
  window.onload = novemberData;
}
if (dbMonth == 'December') {
  window.onload = decemberData;
}
if (dbMonth == 'January') {
  window.onload = januaryData;
}
if (dbMonth == 'February') {
  window.onload = februaryData;
}
if (dbMonth == 'March') {
  window.onload = marchData;
}
if (dbMonth == 'April-May') {
  window.onload = aprilData;
}
if (dbMonth == 'June') {
  window.onload = juneData;
}
if (dbMonth == 'July') {
  window.onload = julyData;
}

function octoberData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1Oct;
        var h2 = CurrentRecord.val().h2Oct;
        var h3 = CurrentRecord.val().h3Oct;
        var h4 = CurrentRecord.val().h4Oct;
        var h5 = CurrentRecord.val().h5Oct;
        var h6 = CurrentRecord.val().h6Oct;
        var h7 = CurrentRecord.val().h7Oct;
        var h8 = CurrentRecord.val().h8Oct;
        var h9 = CurrentRecord.val().h9Oct;
        var h10 = CurrentRecord.val().h10Oct;
        var h11 = CurrentRecord.val().h11Oct;
        var h12 = CurrentRecord.val().h12Oct;
        var h13 = CurrentRecord.val().h13Oct;
        var h14 = CurrentRecord.val().h14Oct;
        var h15 = CurrentRecord.val().h15Oct;
        var h16 = CurrentRecord.val().h16Oct;
        var h17 = CurrentRecord.val().h17Oct;
        var h18 = CurrentRecord.val().h18Oct;
        var h19 = CurrentRecord.val().h19Oct;
        var h20 = CurrentRecord.val().h20Oct; 

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hNov = CurrentRecord.val().hNov; 
        var getSum;
        if(!hNov){hNov = '0.00'};
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00'){
          getSum = hNov;
        }
        if(setSum != '0.00'){
          getSum = setSum;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: setSum,
              });
        }



        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1Oct: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2Oct: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19Oct: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20Oct: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function novemberData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1NovT;
        var h2 = CurrentRecord.val().h2NovT;
        var h3 = CurrentRecord.val().h3NovT;
        var h4 = CurrentRecord.val().h4NovT;
        var h5 = CurrentRecord.val().h5NovT;
        var h6 = CurrentRecord.val().h6NovT;
        var h7 = CurrentRecord.val().h7NovT;
        var h8 = CurrentRecord.val().h8NovT;
        var h9 = CurrentRecord.val().h9NovT;
        var h10 = CurrentRecord.val().h10NovT;
        var h11 = CurrentRecord.val().h11NovT;
        var h12 = CurrentRecord.val().h12NovT;
        var h13 = CurrentRecord.val().h13NovT;
        var h14 = CurrentRecord.val().h14NovT;
        var h15 = CurrentRecord.val().h15NovT;
        var h16 = CurrentRecord.val().h16NovT;
        var h17 = CurrentRecord.val().h17NovT;
        var h18 = CurrentRecord.val().h18NovT;
        var h19 = CurrentRecord.val().h19NovT;
        var h20 = CurrentRecord.val().h20NovT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hDec = CurrentRecord.val().hDec;
        var getSum;
        if (!hDec) { hDec = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hDec;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hDec: setSum,
            });
        }



        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1NovT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2NovT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19NovT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20NovT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function decemberData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1DecT;
        var h2 = CurrentRecord.val().h2DecT;
        var h3 = CurrentRecord.val().h3DecT;
        var h4 = CurrentRecord.val().h4DecT;
        var h5 = CurrentRecord.val().h5DecT;
        var h6 = CurrentRecord.val().h6DecT;
        var h7 = CurrentRecord.val().h7DecT;
        var h8 = CurrentRecord.val().h8DecT;
        var h9 = CurrentRecord.val().h9DecT;
        var h10 = CurrentRecord.val().h10DecT;
        var h11 = CurrentRecord.val().h11DecT;
        var h12 = CurrentRecord.val().h12DecT;
        var h13 = CurrentRecord.val().h13DecT;
        var h14 = CurrentRecord.val().h14DecT;
        var h15 = CurrentRecord.val().h15DecT;
        var h16 = CurrentRecord.val().h16DecT;
        var h17 = CurrentRecord.val().h17DecT;
        var h18 = CurrentRecord.val().h18DecT;
        var h19 = CurrentRecord.val().h19DecT;
        var h20 = CurrentRecord.val().h20DecT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hJan = CurrentRecord.val().hJan;
        var getSum;
        if (!hJan) { hJan = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hJan;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hJan: setSum,
            });
        }


        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1DecT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2DecT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19DecT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20DecT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function januaryData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1JanT;
        var h2 = CurrentRecord.val().h2JanT;
        var h3 = CurrentRecord.val().h3JanT;
        var h4 = CurrentRecord.val().h4JanT;
        var h5 = CurrentRecord.val().h5JanT;
        var h6 = CurrentRecord.val().h6JanT;
        var h7 = CurrentRecord.val().h7JanT;
        var h8 = CurrentRecord.val().h8JanT;
        var h9 = CurrentRecord.val().h9JanT;
        var h10 = CurrentRecord.val().h10JanT;
        var h11 = CurrentRecord.val().h11JanT;
        var h12 = CurrentRecord.val().h12JanT;
        var h13 = CurrentRecord.val().h13JanT;
        var h14 = CurrentRecord.val().h14JanT;
        var h15 = CurrentRecord.val().h15JanT;
        var h16 = CurrentRecord.val().h16JanT;
        var h17 = CurrentRecord.val().h17JanT;
        var h18 = CurrentRecord.val().h18JanT;
        var h19 = CurrentRecord.val().h19JanT;
        var h20 = CurrentRecord.val().h20JanT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hFeb = CurrentRecord.val().hFeb;
        var getSum;
        if (!hFeb) { hFeb = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hFeb;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hFeb: setSum,
            });
        }



        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1JanT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2JanT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19JanT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20JanT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function februaryData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1FebT;
        var h2 = CurrentRecord.val().h2FebT;
        var h3 = CurrentRecord.val().h3FebT;
        var h4 = CurrentRecord.val().h4FebT;
        var h5 = CurrentRecord.val().h5FebT;
        var h6 = CurrentRecord.val().h6FebT;
        var h7 = CurrentRecord.val().h7FebT;
        var h8 = CurrentRecord.val().h8FebT;
        var h9 = CurrentRecord.val().h9FebT;
        var h10 = CurrentRecord.val().h10FebT;
        var h11 = CurrentRecord.val().h11FebT;
        var h12 = CurrentRecord.val().h12FebT;
        var h13 = CurrentRecord.val().h13FebT;
        var h14 = CurrentRecord.val().h14FebT;
        var h15 = CurrentRecord.val().h15FebT;
        var h16 = CurrentRecord.val().h16FebT;
        var h17 = CurrentRecord.val().h17FebT;
        var h18 = CurrentRecord.val().h18FebT;
        var h19 = CurrentRecord.val().h19FebT;
        var h20 = CurrentRecord.val().h20FebT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hMar = CurrentRecord.val().hMar;
        var getSum;
        if (!hMar) { hMar = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hMar;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hMar: setSum,
            });
        }


        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1FebT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2FebT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19FebT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20FebT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function marchData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1MarT;
        var h2 = CurrentRecord.val().h2MarT;
        var h3 = CurrentRecord.val().h3MarT;
        var h4 = CurrentRecord.val().h4MarT;
        var h5 = CurrentRecord.val().h5MarT;
        var h6 = CurrentRecord.val().h6MarT;
        var h7 = CurrentRecord.val().h7MarT;
        var h8 = CurrentRecord.val().h8MarT;
        var h9 = CurrentRecord.val().h9MarT;
        var h10 = CurrentRecord.val().h10MarT;
        var h11 = CurrentRecord.val().h11MarT;
        var h12 = CurrentRecord.val().h12MarT;
        var h13 = CurrentRecord.val().h13MarT;
        var h14 = CurrentRecord.val().h14MarT;
        var h15 = CurrentRecord.val().h15MarT;
        var h16 = CurrentRecord.val().h16MarT;
        var h17 = CurrentRecord.val().h17MarT;
        var h18 = CurrentRecord.val().h18MarT;
        var h19 = CurrentRecord.val().h19MarT;
        var h20 = CurrentRecord.val().h20MarT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hApr = CurrentRecord.val().hApr;
        var getSum;
        if (!hApr) { hApr = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hApr;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hApr: setSum,
            });
        }



        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1MarT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2MarT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19MarT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20MarT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function aprilData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1AprT;
        var h2 = CurrentRecord.val().h2AprT;
        var h3 = CurrentRecord.val().h3AprT;
        var h4 = CurrentRecord.val().h4AprT;
        var h5 = CurrentRecord.val().h5AprT;
        var h6 = CurrentRecord.val().h6AprT;
        var h7 = CurrentRecord.val().h7AprT;
        var h8 = CurrentRecord.val().h8AprT;
        var h9 = CurrentRecord.val().h9AprT;
        var h10 = CurrentRecord.val().h10AprT;
        var h11 = CurrentRecord.val().h11AprT;
        var h12 = CurrentRecord.val().h12AprT;
        var h13 = CurrentRecord.val().h13AprT;
        var h14 = CurrentRecord.val().h14AprT;
        var h15 = CurrentRecord.val().h15AprT;
        var h16 = CurrentRecord.val().h16AprT;
        var h17 = CurrentRecord.val().h17AprT;
        var h18 = CurrentRecord.val().h18AprT;
        var h19 = CurrentRecord.val().h19AprT;
        var h20 = CurrentRecord.val().h20AprT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hJun = CurrentRecord.val().hJun;
        var getSum;
        if (!hJun) { hJun = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hJun;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hJun: setSum,
            });
        }



        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1AprT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2AprT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19AprT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20AprT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function juneData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1JunT;
        var h2 = CurrentRecord.val().h2JunT;
        var h3 = CurrentRecord.val().h3JunT;
        var h4 = CurrentRecord.val().h4JunT;
        var h5 = CurrentRecord.val().h5JunT;
        var h6 = CurrentRecord.val().h6JunT;
        var h7 = CurrentRecord.val().h7JunT;
        var h8 = CurrentRecord.val().h8JunT;
        var h9 = CurrentRecord.val().h9JunT;
        var h10 = CurrentRecord.val().h10JunT;
        var h11 = CurrentRecord.val().h11JunT;
        var h12 = CurrentRecord.val().h12JunT;
        var h13 = CurrentRecord.val().h13JunT;
        var h14 = CurrentRecord.val().h14JunT;
        var h15 = CurrentRecord.val().h15JunT;
        var h16 = CurrentRecord.val().h16JunT;
        var h17 = CurrentRecord.val().h17JunT;
        var h18 = CurrentRecord.val().h18JunT;
        var h19 = CurrentRecord.val().h19JunT;
        var h20 = CurrentRecord.val().h20JunT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hJul = CurrentRecord.val().hJul;
        var getSum;
        if (!hJul) { hJul = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hJul;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hJul: setSum,
            });
        }



        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1JunT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2JunT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19JunT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20JunT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}
function julyData() {
  document.getElementById("showInput5a").innerHTML = "";
  let stdN0 = 0;
  let stdN0TEst = 0;
  hwNumber = 0;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var myKh = CurrentRecord.val().myKh;
        var h1 = CurrentRecord.val().h1JulT;
        var h2 = CurrentRecord.val().h2JulT;
        var h3 = CurrentRecord.val().h3JulT;
        var h4 = CurrentRecord.val().h4JulT;
        var h5 = CurrentRecord.val().h5JulT;
        var h6 = CurrentRecord.val().h6JulT;
        var h7 = CurrentRecord.val().h7JulT;
        var h8 = CurrentRecord.val().h8JulT;
        var h9 = CurrentRecord.val().h9JulT;
        var h10 = CurrentRecord.val().h10JulT;
        var h11 = CurrentRecord.val().h11JulT;
        var h12 = CurrentRecord.val().h12JulT;
        var h13 = CurrentRecord.val().h13JulT;
        var h14 = CurrentRecord.val().h14JulT;
        var h15 = CurrentRecord.val().h15JulT;
        var h16 = CurrentRecord.val().h16JulT;
        var h17 = CurrentRecord.val().h17JulT;
        var h18 = CurrentRecord.val().h18JulT;
        var h19 = CurrentRecord.val().h19JulT;
        var h20 = CurrentRecord.val().h20JulT;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!h1) { h1 = '0' };
        if (!h2) { h2 = '0' };
        if (!h3) { h3 = '0' };
        if (!h4) { h4 = '0' };
        if (!h5) { h5 = '0' };
        if (!h6) { h6 = '0' };
        if (!h7) { h7 = '0' };
        if (!h8) { h8 = '0' };
        if (!h9) { h9 = '0' };
        if (!h10) { h10 = '0' };
        if (!h11) { h11 = '0' };
        if (!h12) { h12 = '0' };
        if (!h13) { h13 = '0' };
        if (!h14) { h14 = '0' };
        if (!h15) { h15 = '0' };
        if (!h16) { h16 = '0' };
        if (!h17) { h17 = '0' };
        if (!h18) { h18 = '0' };
        if (!h19) { h19 = '0' };
        if (!h20) { h20 = '0' };

        stdN0++;
        stdN0TEst++;

        //Total averge
        let set =
          parseFloat(h1) + parseFloat(h2) +
          parseFloat(h3) + parseFloat(h4) +
          parseFloat(h5) + parseFloat(h6) +
          parseFloat(h7) + parseFloat(h8) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h9) + parseFloat(h10) +
          parseFloat(h11) + parseFloat(h15) +
          parseFloat(h12) + parseFloat(h16) +
          parseFloat(h13) + parseFloat(h17) +
          parseFloat(h14) + parseFloat(h18) +
          parseFloat(h19) + parseFloat(h20);

        let sum = set / parseFloat(dbDivid);

        if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
          function getSumFunction(value) {
            if (value < 0.25) return 0;

            if (value < 1.25) return 1.00;

            if (value < 2.25) return 2.00;

            if (value < 3.25) return 3.00;

            if (value < 4.25) return 4.00;

            if (value < 5.25) return 5.00;

            if (value < 6.25) return 6.00;

            if (value < 7.25) return 7.00;

            if (value < 8.25) return 8.00;

            if (value < 9.25) return 9.00;
            return 10;
          }

        } else {
          function getSumFunction(value) {
            if (value < 0.25) return 0;
            if (value < 0.50) return 0.25;
            if (value < 0.75) return 0.50;
            if (value < 1.00) return 0.75;

            if (value < 1.25) return 1.00;
            if (value < 1.50) return 1.25;
            if (value < 1.75) return 1.50;
            if (value < 2.00) return 1.75;

            if (value < 2.25) return 2.00;
            if (value < 2.50) return 2.25;
            if (value < 2.75) return 2.50;
            if (value < 3.00) return 2.75;

            if (value < 3.25) return 3.00;
            if (value < 3.50) return 3.25;
            if (value < 3.75) return 3.50;
            if (value < 4.00) return 3.75;

            if (value < 4.25) return 4.00;
            if (value < 4.50) return 4.25;
            if (value < 4.75) return 4.50;
            if (value < 5.00) return 4.75;

            if (value < 5.25) return 5.00;
            if (value < 5.50) return 5.25;
            if (value < 5.75) return 5.50;
            if (value < 6.00) return 5.75;

            if (value < 6.25) return 6.00;
            if (value < 6.50) return 6.25;
            if (value < 6.75) return 6.50;
            if (value < 7.00) return 6.75;

            if (value < 7.25) return 7.00;
            if (value < 7.50) return 7.25;
            if (value < 7.75) return 7.50;
            if (value < 8.00) return 7.75;

            if (value < 8.25) return 8.00;
            if (value < 8.50) return 8.25;
            if (value < 8.75) return 8.50;
            if (value < 9.00) return 8.75;

            if (value < 9.25) return 9.00;
            if (value < 9.50) return 9.25;
            if (value < 9.75) return 9.50;
            if (value < 10.00) return 9.75;
            return 10;
          }
        }

        var hAug = CurrentRecord.val().hAug;
        var getSum;
        if (!hAug) { hAug = '0.00' };
        let setSum = getSumFunction(sum);
        setSum = setSum.toFixed(2);

        ///Set Data to Firebase
        if (setSum == '0.00') {
          getSum = hAug;
        }
        if (setSum != '0.00') {
          getSum = setSum;
          firebase
            .database()
            .ref(`${dbGrade}/` + `${dbYear}/` + id)
            .update({
              hAug: setSum,
            });
        }



        let table = `
          <td class="table-bordered border-dark text-center">${stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h1="${stdN0}" contenteditable id="${noSp}h1">${h1}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h2="${stdN0}" contenteditable id="${noSp}h2">${h2}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h3="${stdN0}" contenteditable id="${noSp}h3">${h3}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h4="${stdN0}" contenteditable id="${noSp}h4">${h4}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h5="${stdN0}" contenteditable id="${noSp}h5">${h5}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h6="${stdN0}" contenteditable id="${noSp}h6">${h6}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h7="${stdN0}" contenteditable id="${noSp}h7">${h7}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h8="${stdN0}" contenteditable id="${noSp}h8">${h8}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h9="${stdN0}" contenteditable id="${noSp}h9">${h9}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h10="${stdN0}" contenteditable id="${noSp}h10">${h10}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h11="${stdN0}" contenteditable id="${noSp}h11">${h11}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h12="${stdN0}" contenteditable id="${noSp}h12">${h12}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h13="${stdN0}" contenteditable id="${noSp}h13">${h13}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h14="${stdN0}" contenteditable id="${noSp}h14">${h14}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h15="${stdN0}" contenteditable id="${noSp}h15">${h15}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h16="${stdN0}" contenteditable id="${noSp}h16">${h16}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h17="${stdN0}" contenteditable id="${noSp}h17">${h17}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h18="${stdN0}" contenteditable id="${noSp}h18">${h18}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h19="${stdN0}" contenteditable id="${noSp}h19">${h19}</td>
          <td class="table-bordered border-dark text-center fw-bold" data-h20="${stdN0}" contenteditable id="${noSp}h20">${h20}</td>
          <td class="table-bordered border-dark text-center fw-bold" style="color: red;">${getSum}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
          <td class="table-bordered border-dark">${name}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center">${grade}</td>
          `;
        showTable.innerHTML += table;
        // showTableView.innerHTML += tableView;

        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          ///Set background color
          if (!document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h1`).innerHTML == '0') { document.getElementById(`${noSp}h1`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h2`).innerHTML == '0') { document.getElementById(`${noSp}h2`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h3`).innerHTML == '0') { document.getElementById(`${noSp}h3`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h4`).innerHTML == '0') { document.getElementById(`${noSp}h4`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h5`).innerHTML == '0') { document.getElementById(`${noSp}h5`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h6`).innerHTML == '0') { document.getElementById(`${noSp}h6`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h7`).innerHTML == '0') { document.getElementById(`${noSp}h7`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h8`).innerHTML == '0') { document.getElementById(`${noSp}h8`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h9`).innerHTML == '0') { document.getElementById(`${noSp}h9`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h10`).innerHTML == '0') { document.getElementById(`${noSp}h10`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h11`).innerHTML == '0') { document.getElementById(`${noSp}h11`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h12`).innerHTML == '0') { document.getElementById(`${noSp}h12`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h13`).innerHTML == '0') { document.getElementById(`${noSp}h13`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h14`).innerHTML == '0') { document.getElementById(`${noSp}h14`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h15`).innerHTML == '0') { document.getElementById(`${noSp}h15`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h16`).innerHTML == '0') { document.getElementById(`${noSp}h16`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h17`).innerHTML == '0') { document.getElementById(`${noSp}h17`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h18`).innerHTML == '0') { document.getElementById(`${noSp}h18`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h19`).innerHTML == '0') { document.getElementById(`${noSp}h19`).style.backgroundColor = '#FF3333' };

          if (!document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#9DFF33' };
          if (document.getElementById(`${noSp}h20`).innerHTML == '0') { document.getElementById(`${noSp}h20`).style.backgroundColor = '#FF3333' };

          //Input data in column
          document.getElementById(`${noSp}h1`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h1JulT: ss,
              });

          })
          document.getElementById(`${noSp}h2`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h2JulT: ss,
              });
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h3JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h4JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h5JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h6JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h7JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h8JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h9JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h10JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h11JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h12JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h13JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h14JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h15JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h16JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h17JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h18JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h19JulT: ss,
              });
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                h20JulT: ss,
              });
          })

          //Click table to be empty
          document.getElementById(`${noSp}h1`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h1`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h1`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}h2`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h2`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h2`).innerHTML = '';
            }
          })
          ////
          document.getElementById(`${noSp}h3`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h3`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h3`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h4`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h4`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h4`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h5`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h5`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h5`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h6`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h6`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h6`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h7`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h7`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h7`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h8`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h8`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h8`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h9`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h9`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h9`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h10`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h10`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h10`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h11`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h11`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h11`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h12`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h12`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h12`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h13`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h13`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h13`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h14`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h14`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h14`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h15`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h15`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h15`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h16`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h16`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h16`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h17`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h17`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h17`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h18`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h18`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h18`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h19`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h19`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h19`).innerHTML = '';
            }
          })

          ////
          document.getElementById(`${noSp}h20`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}h20`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}h20`).innerHTML = '';
            }
          })

          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          ////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h1);
              const nextCell = document.querySelector(`[data-h1="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h3);
              const nextCell = document.querySelector(`[data-h3="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h2);
              const nextCell = document.querySelector(`[data-h2="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h4);
              const nextCell = document.querySelector(`[data-h4="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h5);
              const nextCell = document.querySelector(`[data-h5="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h6);
              const nextCell = document.querySelector(`[data-h6="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h7);
              const nextCell = document.querySelector(`[data-h7="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h8);
              const nextCell = document.querySelector(`[data-h8="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h9);
              const nextCell = document.querySelector(`[data-h9="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h10);
              const nextCell = document.querySelector(`[data-h10="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h11);
              const nextCell = document.querySelector(`[data-h11="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h12);
              const nextCell = document.querySelector(`[data-h12="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h13);
              const nextCell = document.querySelector(`[data-h13="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h14);
              const nextCell = document.querySelector(`[data-h14="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h15);
              const nextCell = document.querySelector(`[data-h15="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h16);
              const nextCell = document.querySelector(`[data-h16="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h17);
              const nextCell = document.querySelector(`[data-h17="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h18);
              const nextCell = document.querySelector(`[data-h18="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h19);
              const nextCell = document.querySelector(`[data-h19="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          /////
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.h20);
              const nextCell = document.querySelector(`[data-h20="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

        };
        sleep(1000);
      });
    });
}

function printDoc() {
  var newstr = document.getElementById("TestView").innerHTML;
  var oldstr = document.body.innerHTML;
  document.body.innerHTML = newstr;
  window.print();
  document.body.innerHTML = oldstr;
  window.location.reload();
  return false;
}
//Save to excel
// document.getElementById("saveData").addEventListener('click', () => {
//   saveToExcel();
// })
function saveToExcel(type, fn, dl) {
  var elt = document.getElementById("saveDataExcel");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || `${dbGrade}/ ` + `${dbYear}/.` + (type || "xlsx"));
}

///Logout
if (!userName) {
  window.location.replace('index.html');
}
document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem("dbGrade");
  localStorage.removeItem("dbName");
  window.location.replace('index.html')

})
///Admin
var adPut = document.getElementById('secretPass');
function addMin() {
  console.log('googogo');
  firebase
    .database()
    .ref(`salamom/`)
    .once("value", function (usersRecord) {
      usersRecord.forEach(function (data) {
        var words = data.val().words;
        var username = data.val().username;
        document.getElementById('adminLogin').addEventListener('click', () => {
          if (adPut.value == words) {
            localStorage.setItem('dbSecretData', adPut.value);
            window.location.replace('page-register.html')
          }
        })
      });
    });
}
addMin();