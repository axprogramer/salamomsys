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
  localStorage.setItem("stdGradeIn", newGrade);
  window.location.reload();
});
document.getElementById("academicYear").addEventListener("change", function () {
  var newYear = document.getElementById("academicYear").value;
  localStorage.setItem("stdYearIn", newYear);
  window.location.reload();
});
document.getElementById("myMonth").addEventListener("change", function () {
  var newMonth = document.getElementById("myMonth").value;
  localStorage.setItem("stdMonthIn", newMonth);
  window.location.reload();
});
var dbGrade = localStorage.getItem("stdGradeIn"); //Grade
var dbYear = localStorage.getItem("stdYearIn"); //Year
var dbMonth = localStorage.getItem("stdMonthIn"); //Month
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
// var stdN0;
// var stdN0View;
// var stdN0TEst;

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
if (dbMonth == '1st Semester') {
  window.onload = firstSemesterData;
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
if (dbMonth == '2nd Semester') {
  window.onload = secondSemesterData;
}
function novemberData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center removeSpace" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);

            if (['1A', '1B', '2A', '2B'].includes(dbGrade)) {
              function getSumFunction(value) {
                if (value < 0.25) return 0;
                if (value < 0.75) return 0.50;

                if (value < 1.25) return 1.00;
                if (value < 1.75) return 1.50;

                if (value < 2.25) return 1.00;
                if (value < 2.75) return 2.50;

                if (value < 3.25) return 2.00;
                if (value < 3.75) return 3.50;

                if (value < 4.25) return 3.00;
                if (value < 4.75) return 4.50;

                if (value < 5.25) return 4.00;
                if (value < 5.75) return 5.50;

                if (value < 6.25) return 5.00;
                if (value < 6.75) return 6.50;

                if (value < 7.25) return 6.00;
                if (value < 7.75) return 7.50;

                if (value < 8.25) return 7.00;
                if (value < 8.75) return 8.50;

                if (value < 9.25) return 8.00;
                if (value < 9.75) return 9.50;
                return 10;
              }
            }
            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }
            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            let getSum3 = getSumFunction(to1);
            getSum3 = getSum3.toFixed(2);
            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scoreNov: ss,
                speakingNov: sp.innerHTML,
                writingNov: wr.innerHTML,
                listeningNov: li.innerHTML,
                readingNov: re.innerHTML,
                hNov: ho.innerHTML,
                averageNov: totalAll,

              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function decemberData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scoreDec;
        var speaking = CurrentRecord.val().speakingDec;
        var writing = CurrentRecord.val().writingDec;
        var listening = CurrentRecord.val().listeningDec;
        var reading = CurrentRecord.val().readingDec;
        var average = CurrentRecord.val().averageNov;
        var h = CurrentRecord.val().hDec;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }
            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            const getSum3 = getSumFunction(to1);

            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scoreDec: ss,
                speakingDec: sp.innerHTML,
                writingDec: wr.innerHTML,
                listeningDec: li.innerHTML,
                readingDec: re.innerHTML,
                hDec: ho.innerHTML,
                averageDec: totalAll,
              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function januaryData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scoreJan;
        var speaking = CurrentRecord.val().speakingJan;
        var writing = CurrentRecord.val().writingJan;
        var listening = CurrentRecord.val().listeningJan;
        var reading = CurrentRecord.val().readingJan;
        var h = CurrentRecord.val().hJan;

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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          //Update data
          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);
            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }
            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            const getSum3 = getSumFunction(to1);

            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scoreJan: ss,
                speakingJan: sp.innerHTML,
                writingJan: wr.innerHTML,
                listeningJan: li.innerHTML,
                readingJan: re.innerHTML,
                hJan: ho.innerHTML,
              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function februaryData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scorefeb;
        var speaking = CurrentRecord.val().speakingfeb;
        var writing = CurrentRecord.val().writingfeb;
        var listening = CurrentRecord.val().listeningfeb;
        var reading = CurrentRecord.val().readingfeb;
        var h = CurrentRecord.val().hFeb;

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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          //Update data
          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);

            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }

            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            const getSum3 = getSumFunction(to1);

            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scorefeb: ss,
                speakingfeb: sp.innerHTML,
                writingfeb: wr.innerHTML,
                listeningfeb: li.innerHTML,
                readingfeb: re.innerHTML,
                hFeb: ho.innerHTML,
              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function firstSemesterData() {
  document.getElementById("he1").innerHTML = '1st Semester Score';
  document.getElementById("he2").style.display = 'none';
  document.getElementById("he3").style.display = 'none';
  document.getElementById("he4").style.display = 'none';
  document.getElementById("he5").style.display = 'none';
  document.getElementById("he6").style.display = 'none';
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scorest;
        var my1Se = CurrentRecord.val().my1Se;
        var my1Sa = CurrentRecord.val().my1Sa;

        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!my1Se) {
          my1Se = '0'
        }
        if (!score) {
          score = '0'
        }
        if (!my1Sa) {
          my1Sa = '0'
        }

        //Total averge
        var tA = parseFloat(my1Se);
        var totalAll = parseFloat(tA) / 4;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${tA}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var av = document.getElementById(`${noSp}average`);
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }
            const getSum3 = getSumFunction(to1);
            av.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scorest: ss,
                my1Se: ss,
                my1Sa: getSum3,
              });
          })

        };
        sleep(1000);
      });
    });
}
function marchData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scoremar;
        var speaking = CurrentRecord.val().speakingmar;
        var writing = CurrentRecord.val().writingmar;
        var listening = CurrentRecord.val().listeningmar;
        var reading = CurrentRecord.val().readingmar;
        var h = CurrentRecord.val().hMar;

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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          //Update data
          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);

            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }

            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            const getSum3 = getSumFunction(to1);

            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scoremar: ss,
                speakingmar: sp.innerHTML,
                writingmar: wr.innerHTML,
                listeningmar: li.innerHTML,
                readingmar: re.innerHTML,
                hMar: ho.innerHTML,
              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function aprilData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scorema;
        var speaking = CurrentRecord.val().speakingma;
        var writing = CurrentRecord.val().writingma;
        var listening = CurrentRecord.val().listeningma;
        var reading = CurrentRecord.val().readingma;
        var h = CurrentRecord.val().hApr;

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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          //Update data
          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);

            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }

            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            const getSum3 = getSumFunction(to1);

            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scorema: ss,
                speakingma: sp.innerHTML,
                writingma: wr.innerHTML,
                listeningma: li.innerHTML,
                readingma: re.innerHTML,
                hApr: ho.innerHTML,
              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function juneData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scorejun;
        var speaking = CurrentRecord.val().speakingjun;
        var writing = CurrentRecord.val().writingjun;
        var listening = CurrentRecord.val().listeningjun;
        var reading = CurrentRecord.val().readingjun;
        var h = CurrentRecord.val().hJun;

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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          //Update data
          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);

            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }

            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            const getSum3 = getSumFunction(to1);

            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scorejun: ss,
                speakingjun: sp.innerHTML,
                writingjun: wr.innerHTML,
                listeningjun: li.innerHTML,
                readingjun: re.innerHTML,
                hJun: ho.innerHTML,
              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function julyData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scorejuly;
        var speaking = CurrentRecord.val().speakingjuly;
        var writing = CurrentRecord.val().writingjuly;
        var listening = CurrentRecord.val().listeningjuly;
        var reading = CurrentRecord.val().readingjuly;
        var h = CurrentRecord.val().hJul;

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
        //Total averge
        var tA = parseFloat(speaking) + parseFloat(writing) + parseFloat(writing) + parseFloat(listening) + parseFloat(h);
        var totalAll = parseFloat(tA) / 5;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${score}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}speak">${speaking}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}write">${writing}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}listen">${listening}</td>
          <td class="table-bordered border-dark text-center" id="${noSp}read">${reading}</td>
          <td class="table-bordered border-dark text-center" data-hw="${++hwNumber}" contenteditable id="${noSp}hw">${h}</td>
          <td class="table-bordered border-dark text-center" contenteditable style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}score`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}hw`).addEventListener('click', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            if (ss == '0') {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          document.getElementById(`${noSp}score`).addEventListener('keydown', function (event) {
            if (event.key === "Tab") {
              document.getElementById(`${noSp}hw`).innerHTML = '';
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.hw);
              const nextCell = document.querySelector(`[data-hw="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          //Update data
          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var sp = document.getElementById(`${noSp}speak`);
            var wr = document.getElementById(`${noSp}write`);
            var li = document.getElementById(`${noSp}listen`);
            var re = document.getElementById(`${noSp}read`);
            var ho = document.getElementById(`${noSp}hw`);

            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }

            var avv = document.getElementById(`${noSp}average`);
            var home = ho.innerHTML;
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            const getSum3 = getSumFunction(to1);

            var get1 = parseFloat(ss) + parseFloat(home);
            var totalAv = get1 / 5;
            totalAv = totalAv.toFixed(2);
            avv.innerHTML = totalAv

            sp.innerHTML = getSum3;
            wr.innerHTML = getSum3;
            li.innerHTML = getSum3;
            re.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                scorejuly: ss,
                speakingjuly: sp.innerHTML,
                writingjuly: wr.innerHTML,
                listeningjuly: li.innerHTML,
                readingjuly: re.innerHTML,
                hJul: ho.innerHTML,
              });
          })
          //Speaking
          document.getElementById(`${noSp}hw`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}hw`).innerHTML;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/` + id)
              .update({
                hNov: ss,
              });
          })
        };
        sleep(1000);
      });
    });
}
function secondSemesterData() {
  document.getElementById("he1").innerHTML = '2nd Semester Score';
  document.getElementById("he2").style.display = 'none';
  document.getElementById("he3").style.display = 'none';
  document.getElementById("he4").style.display = 'none';
  document.getElementById("he5").style.display = 'none';
  document.getElementById("he6").style.display = 'none';
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0TEst = 0;
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
        var url = CurrentRecord.val().urlImg;
        var score = CurrentRecord.val().scorest;
        var my1Se = CurrentRecord.val().my2Se;
        var my1Sa = CurrentRecord.val().my2Sa;
        let showTable = document.getElementById("showInput5a");
        let showTableView = document.getElementById("showView");
        let noSp = id.replace(/\s+/g, "");
        let noSpname = noSp + "edit";
        if (!my1Se) {
          my1Se = '0'
        }
        if (!score) {
          score = '0'
        }
        if (!my1Sa) {
          my1Sa = '0'
        }

        //Total averge
        var tA = parseFloat(my1Se);
        var totalAll = parseFloat(tA) / 4;
        totalAll = totalAll.toFixed(2);
        let table = `
          <td class="table-bordered border-dark text-center">${++stdN0}</td>
          <td class="table-bordered border-dark khmerFont">${myKh}</td>
          <td class="table-bordered border-dark text-center">${sex}</td>
          <td class="table-bordered border-dark text-center" data-index="${++stdN0TEst}" contenteditable id="${noSp}score">${tA}</td>
          <td class="table-bordered border-dark text-center" style="color: red;" id="${noSp}average">${totalAll}</td>
          `;
        let tableView = `
          <td class="table-bordered border-dark text-center"></td>
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
          document.getElementById(`${noSp}score`).addEventListener('click', () => {
            if (document.getElementById(`${noSp}score`).innerHTML == 0) {
              document.getElementById(`${noSp}score`).innerHTML = '';
            } else {
            }
          })
          ///Set Key Enter/Key Arrow Up and Down to the next cell data
          const table = document.getElementById("Test");
          table.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const currentCell = event.target;
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }
              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex + 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
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
              const currentIndex = parseInt(currentCell.dataset.index);
              const nextCell = document.querySelector(`[data-index="${currentIndex - 1}"]`);
              const focusedCell = document.activeElement;
              if (focusedCell && focusedCell.tagName === "TD") {
                const text = focusedCell.textContent;
                const range = document.createRange();
                range.selectNodeContents(focusedCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
              }

              if (nextCell) {
                nextCell.focus();
                if (nextCell.textContent == 0) {
                  nextCell.textContent = '';
                }
              } else {
              }
            }
          });

          document.getElementById(`${noSp}score`).addEventListener('input', () => {
            var ss = document.getElementById(`${noSp}score`).innerHTML;
            var av = document.getElementById(`${noSp}average`);
            var to1 = parseFloat(ss) / 4;
            to1 = to1.toFixed(2);
            function getSumFunction(value) {
              if (value < 0.25) return 0;
              if (value < 0.50) return 0.25;
              if (value < 0.75) return 0.50;

              if (value < 1.00) return 0.75;
              if (value < 1.25) return 1.00;
              if (value < 1.50) return 1.25;
              if (value < 1.75) return 1.50;
              if (value < 2.00) return 1.75;

              if (value < 2.25) return 1.00;
              if (value < 2.50) return 2.25;
              if (value < 2.75) return 2.50;
              if (value < 3.00) return 2.75;

              if (value < 3.25) return 2.00;
              if (value < 3.50) return 3.25;
              if (value < 3.75) return 3.50;
              if (value < 4.00) return 3.75;

              if (value < 4.25) return 3.00;
              if (value < 4.50) return 4.25;
              if (value < 4.75) return 4.50;
              if (value < 5.00) return 4.75;

              if (value < 5.25) return 4.00;
              if (value < 5.50) return 5.25;
              if (value < 5.75) return 5.50;
              if (value < 6.00) return 5.75;

              if (value < 6.25) return 5.00;
              if (value < 6.50) return 6.25;
              if (value < 6.75) return 6.50;
              if (value < 7.00) return 6.75;

              if (value < 7.25) return 6.00;
              if (value < 7.50) return 7.25;
              if (value < 7.75) return 7.50;
              if (value < 8.00) return 7.75;

              if (value < 8.25) return 7.00;
              if (value < 8.50) return 8.25;
              if (value < 8.75) return 8.50;
              if (value < 9.00) return 8.75;

              if (value < 9.25) return 8.00;
              if (value < 9.50) return 9.25;
              if (value < 9.75) return 9.50;
              if (value < 10.00) return 9.75;
              return 10;
            }
            const getSum3 = getSumFunction(to1);
            av.innerHTML = getSum3;
            firebase
              .database()
              .ref(`${dbGrade}/` + `${dbYear}/`+id)
              .update({
                scorest: ss,
                my2Se: ss,
                my2Sa: getSum3,
              });
          })

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