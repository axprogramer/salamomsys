const firebaseConfig = {
  apiKey: "AIzaSyAJ61CR4hcHajBf8T02wl-REVx8SnRxklE",
  authDomain: "useradmin-cd653.firebaseapp.com",
  databaseURL: "https://useradmin-cd653-default-rtdb.firebaseio.com",
  projectId: "useradmin-cd653",
  storageBucket: "useradmin-cd653.appspot.com",
  messagingSenderId: "51017691764",
  appId: "1:51017691764:web:9f322ae1ee6c00c5ce5721",
};

//Class Upgrade localstorage
document.getElementById("enrolGrade").addEventListener("change", function () {
  var oldGrade = document.getElementById("enrolGrade").value;
  localStorage.setItem("oldGrade", oldGrade);
  window.location.reload();
});
document.getElementById("enrolGradeTo").addEventListener("change", function () {
  var newGrade = document.getElementById("enrolGradeTo").value;
  localStorage.setItem("newGrade", newGrade);
  window.location.reload();
});
document.getElementById("academicYear").addEventListener("change", function () {
  var myOldYear = document.getElementById("academicYear").value;
  localStorage.setItem("myOldYear", myOldYear);
  window.location.reload();
});
document
  .getElementById("academicYearTo")
  .addEventListener("change", function () {
    var myNewYear = document.getElementById("academicYearTo").value;
    localStorage.setItem("myNewYear", myNewYear);
    window.location.reload();
  });
var db = localStorage.getItem("oldGrade"); //old grade
var db2 = localStorage.getItem("gradeAct"); //new Grade
var db3 = localStorage.getItem("myOldYear"); //old year
var db4 = localStorage.getItem("myNewYear"); //new Year
document.getElementById("enrolGrade").value = db;
document.getElementById("enrolGradeTo").value = db2; //new
document.getElementById("myNewGrade").value = db2; //new
document.getElementById("academicYear").value = db3;
document.getElementById("academicYearTo").value = db4; //new
document.getElementById("myNewYear").value = db4; //new
//Month, Year, Times, and date for Activity
document.getElementById("myMonthAct").addEventListener("change", function () {
  var monthact = document.getElementById("myMonthAct").value;
  localStorage.setItem("monthAct", monthact);
  window.location.reload();
});
document.getElementById("myTimesAct").addEventListener("change", function () {
  var timesact = document.getElementById("myTimesAct").value;
  localStorage.setItem("timesAct", timesact);
  window.location.reload();
});
document.getElementById("myDate").addEventListener("change", function () {
  var dateact = document.getElementById("myDate").value;
  localStorage.setItem("dateAct", dateact);
  window.location.reload();
});
document.getElementById("myYearAct").addEventListener("change", function () {
  var dateact = document.getElementById("myYearAct").value;
  localStorage.setItem("yearAct", dateact);
  window.location.reload();
});
document.getElementById("myGradeAct").addEventListener("change", function () {
  var dateact = document.getElementById("myGradeAct").value;
  localStorage.setItem("gradeAct", dateact);
  window.location.reload();
});
var dbmonthAct = localStorage.getItem("monthAct"); //month activity
var dbtimesAct = localStorage.getItem("timesAct"); // times activity
var dateAact = localStorage.getItem("dateAct"); // date activity
var yearAact = localStorage.getItem("yearAct"); // year activity
var gradeAact = localStorage.getItem("gradeAct"); // grade activity
document.getElementById("myMonthAct").value = dbmonthAct;
document.getElementById("myTimesAct").value = dbtimesAct;
document.getElementById("myDate").value = dateAact;
document.getElementById("myYearAct").value = yearAact;
document.getElementById("myGradeAct").value = gradeAact;

//Firebase Store

firebase.initializeApp(firebaseConfig);
var my5aAll = firebase.database().ref(`${db}/` + `${db3}/`);
function submitForm(e) {
  e.preventDefault();
  var name = getElementVal("myName");
  var id = getElementVal("myID");
  var sex = getElementVal("mySex");
  var grade = getElementVal("myGrade");
  var year = getElementVal("myYear");

  //November
  //Khmer Name
  var myKh = getElementVal("myKh");
  // window.location.reload();
  saveData(name, id, sex, grade, year, myKh);
}
const saveData = (name, id, sex, grade, year, myKh) => {
  var newData = my5aAll.push();
  newData.set({
    name: name,
    id: id,
    sex: sex,
    grade: grade,
    year: year,
    myKh: myKh,
  });
};
const getElementVal = (id) => {
  return document.getElementById(id).value;
};
function selectAllData() {
  document.getElementById("showInput5a").innerHTML = "";
  studentN0 = 0;
  firebase
    .database()
    .ref(`${db}/` + `${db3}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var name = CurrentRecord.val().name;
        var id = CurrentRecord.val().id;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var year = CurrentRecord.val().year;
        var myKh = CurrentRecord.val().myKh;
        addItemsToTable(name, id, sex, grade, year, myKh);
        showAuto(name, id, sex, grade, year, myKh);
        b = 1;
        document.getElementById("showNNN").value = b;
        cccSS();
        document.getElementById("alertMagWait").style.display = "none";
        document.getElementById("alertMagWait2").style.display = "none";
        document.getElementById("alertMagWait3").style.display = "none";
      });
    });
}
var studentN0;

var stdList = [];
var upStd = [];
function addItemsToTable(name, id, sex, grade, year, myKh) {
  var tbody = document.getElementById("showInput5a");
  var trow = document.createElement("tr");
  var td0 = document.createElement("td");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  var td6 = document.createElement("td");
  var td7 = document.createElement("td");

  var ch = document.createElement("input");
  ch.type = "checkbox";
  ch.name = "mCheck";
  ch.checked = true;
  ch.setAttribute("class", "chk");
  td2.setAttribute("class", "Enname");
  td3.setAttribute("class", "Khname");
  td4.setAttribute("class", "mySex");
  td5.setAttribute("class", "myGrade");
  stdList.push([name, id, sex, grade, year, myKh]);
  td0.innerHTML = ++studentN0;
  td1.innerHTML = id;
  td2.innerHTML = name;
  td3.innerHTML = myKh;
  td4.innerHTML = sex;
  td5.innerHTML = grade;

  trow.appendChild(td0);
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  td6.appendChild(ch);

  td1.innerHTML = `<button type="button" class="button-7" onclick="Fillbox(${studentN0})">${myKh}</button>`;
  tbody.appendChild(trow);
}
// var io = JSON.parse(localStorage.getItem("students"));
function cook() {
  // e.preventDefault();
  for (i = 0; i < aData.length; i++) {
    var enname = aData[i].myenname;
    var idM = aData[i].id;
    var sex = aData[i].mySex;
    var grade = aData[i].mygrade;
    var khname = aData[i].mykhname;
    firebase
      .database()
      .ref(`${db2}/` + `${db4}/` + idM)
      .set({
        name: enname,
        id: idM,
        sex: sex,
        grade: grade,
        myKh: khname,
      });
  }

  selectAllData();
}
function cook2() {
  // e.preventDefault();
  for (i = 0; i < aData2.length; i++) {
    var enname = aData2[i].myenname;
    var idM = aData2[i].id;
    var sex = aData2[i].mySex;
    firebase
      .database()
      .ref(
        `${gradeAact}/` +
          `recordActivity/` +
          `${yearAact}/` +
          `${dbmonthAct}/` +
          `${dbtimesAct}/` +
          idM
      )
      .set({
        name: enname,
        id: idM,
        sex: sex,
        date: dateAact,
      });
    firebase
      .database()
      .ref(
        `${gradeAact}/` +
          `recordActivity/` +
          `${yearAact}/` +
          `Total/` +
          `${dbmonthAct}/` +
          idM
      )
      .set({
        name: enname,
        sex: sex,
        id: idM,
      });
  }

  selectAllData();
}
function sportAct() {
  // e.preventDefault();
  for (i = 0; i < aData3.length; i++) {
    var enname = aData3[i].myenname;
    var khname = aData3[i].mykhname;
    var idM = aData3[i].id;
    var sex = aData3[i].mySex;
    let data = 0;
    // var date1 = '';
    // var date2 = '';
    // var date3 = '';
    // var date4 = '';
    // var date5 = '';
    // var topic1 = '';
    // var topic2 = '';
    // var topic3 = '';
    // var topic4 = '';
    // var topic5 = '';
    // var prac1 = '';
    // var prac2 = '';
    // var prac3 = '';
    // var prac4 = '';
    // var prac5 = '';
    // var uniform1 = '';
    // var uniform2 = '';
    // var uniform3 = '';
    // var uniform4 = '';
    // var uniform5 = '';
    // var shoe1 = '';
    // var shoe2 = '';
    // var shoe3 = '';
    // var shoe4 = '';
    // var shoe5 = '';
    // var total1 = '';
    // var total2 = '';
    // var total3 = '';
    // var total4 = '';
    // var total5 = '';
    // var subTotal = '';
    firebase
      .database()
      .ref(
        `${gradeAact}/` +
          `recordSport/` +
          `${yearAact}/` +
          `${dbmonthAct}/` +
          idM
      )
      .set({
        name: enname,
        id: idM,
        sex: sex,
        khname: khname,
        // date1: date1,
        // date2: date2,
        // date3: date3,
        // date4: date4,
        // date5: date5,
        // topic1: topic1,
        // topic2: topic2,
        // topic3: topic3,
        // topic4: topic4,
        // topic5: topic5,
        prac1: data,
        prac2: data,
        prac3: data,
        prac4: data,
        prac5: data,
        uniform1: data,
        uniform2: data,
        uniform3: data,
        uniform4: data,
        uniform5: data,
        shoe1: data,
        shoe2: data,
        shoe3: data,
        shoe4: data,
        shoe5: data,
        // total1: total1,
        // total2: total2,
        // total3: total3,
        // total4: total4,
        // total5: total5,
        // subTotal: subTotal,
      });
  }

  selectAllData();
}
function homeworkAct() {
  // e.preventDefault();
  for (i = 0; i < aData4.length; i++) {
    var enname = aData4[i].myenname;
    var khname = aData4[i].mykhname;
    var idM = aData4[i].id;
    var sex = aData4[i].mySex;
    firebase
      .database()
      .ref(
        `${gradeAact}/` +
          `recordHomework/` +
          `${yearAact}/` +
          `${dbmonthAct}/` +
          idM
      )
      .set({
        name: enname,
        id: idM,
        sex: sex,
        khname: khname,
      });
  }

  selectAllData();
}
//Checkbox all check function
function toggle(source) {
  checkboxes = document.getElementsByName("mCheck");
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = source.checked;
  }
}
//Upload for Upgrade class
var aData = [];
$(document).ready(function () {
  $("#btnRows").on("click", function () {
    $("#myTable tbody tr").each(function () {
      var currentRow = $(this);
      var col1 = currentRow.find("td:eq(3)").html();
      var col2 = currentRow.find("td:eq(2)").html();
      var col3 = currentRow.find("td:eq(3)").html();
      var col4 = currentRow.find("td:eq(4)").html();
      var col5 = currentRow.find("td:eq(5)").html();
      var obj = {};
      obj.id = col1;
      obj.myenname = col2;
      obj.mykhname = col3;
      obj.mySex = col4;
      obj.mygrade = db2;
      if (currentRow.find(".chk").is(":checked")) {
        aData.push(obj);
        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          cook();
          // cook2();
          document.getElementById("alertMagWait").style.display = "block";
          document.getElementById("alertMag").style.display = "none";
          document.getElementById("showBtnn").style.display = "none";
          const sleep = async (milliseconds) => {
            await new Promise((resolve) => {
              return setTimeout(resolve, milliseconds);
            });
            window.location.reload();
          };
          sleep(2000);
        };
        sleep(1000);
      }
    });
  });
});
//Upload for Activities
var aData2 = [];
$(document).ready(function () {
  $("#btnAct").on("click", function () {
    $("#myTable tbody tr").each(function () {
      var currentRow = $(this);
      var col1 = currentRow.find("td:eq(3)").html();
      var col2 = currentRow.find("td:eq(2)").html();
      var col3 = currentRow.find("td:eq(3)").html();
      var col4 = currentRow.find("td:eq(4)").html();
      var col5 = currentRow.find("td:eq(5)").html();
      var obj = {};
      obj.id = col1;
      obj.myenname = col2;
      obj.mykhname = col3;
      obj.mySex = col4;
      obj.mygrade = db2;
      if (currentRow.find(".chk").is(":checked")) {
        aData2.push(obj);
        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          // cook();
          cook2();
          document.getElementById("alertMagWait2").style.display = "block";
          document.getElementById("alertMag2").style.display = "none";
          document.getElementById("showBtnn2").style.display = "none";
          const sleep = async (milliseconds) => {
            await new Promise((resolve) => {
              return setTimeout(resolve, milliseconds);
            });
            window.location.reload();
          };
          sleep(2000);
        };
        sleep(1000);
      }
    });
  });
});
//Upload for Sport
var aData3 = [];
$(document).ready(function () {
  $("#btnSport").on("click", function () {
    $("#myTable tbody tr").each(function () {
      var currentRow = $(this);
      var col1 = currentRow.find("td:eq(3)").html();
      var col2 = currentRow.find("td:eq(2)").html();
      var col3 = currentRow.find("td:eq(3)").html();
      var col4 = currentRow.find("td:eq(4)").html();
      var col5 = currentRow.find("td:eq(5)").html();
      var obj = {};
      obj.id = col1;
      obj.myenname = col2;
      obj.mykhname = col3;
      obj.mySex = col4;
      obj.mygrade = db2;
      if (currentRow.find(".chk").is(":checked")) {
        aData3.push(obj);
        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          sportAct();
          document.getElementById("alertMagWait3").style.display = "block";
          document.getElementById("alertMag3").style.display = "none";
          document.getElementById("showBtnn2").style.display = "none";
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        };
        sleep(1000);
      }
    });
  });
});
//Upload for Homework
var aData4 = [];
$(document).ready(function () {
  $("#getHomework").on("click", function () {
    $("#myTable tbody tr").each(function () {
      var currentRow = $(this);
      var col1 = currentRow.find("td:eq(3)").html();
      var col2 = currentRow.find("td:eq(2)").html();
      var col3 = currentRow.find("td:eq(3)").html();
      var col4 = currentRow.find("td:eq(4)").html();
      var col5 = currentRow.find("td:eq(5)").html();
      var obj = {};
      obj.id = col1;
      obj.myenname = col2;
      obj.mykhname = col3;
      obj.mySex = col4;
      obj.mygrade = db2;
      if (currentRow.find(".chk").is(":checked")) {
        aData4.push(obj);
        const sleep = async (milliseconds) => {
          await new Promise((resolve) => {
            return setTimeout(resolve, milliseconds);
          });
          homeworkAct();
          document.getElementById("alertMagWait4").style.display = "block";
          document.getElementById("alertMag4").style.display = "none";
          document.getElementById("showBtnn3").style.display = "none";
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        };
        sleep(1000);
      }
    });
  });
});

var Mname = document.getElementById("myName");
var Mkhname = document.getElementById("myKh");
var Mid = document.getElementById("myID");
var Msex = document.getElementById("mySex");
var Mgrade = document.getElementById("myGrade");
var newgrade = document.getElementById("myNewGrade");
var Myear = document.getElementById("myYear");
var newYear = document.getElementById("myNewYear");

var submit = document.getElementById("mySubmit");
var update = document.getElementById("myUpdate");
var dele = document.getElementById("myDelete");

submit.style.display = "inline-block";
update.style.display = "none";
dele.style.display = "none";
//Show data input auto
function showAuto(name, id, sex, grade, year, myKh) {
  Mname.value = stdList[0][0];
  Mid.value = stdList[0][1];
  Msex.value = stdList[0][2];
  Mgrade.value = stdList[0][3];
  Myear.value = stdList[0][4];
  Mkhname.value = stdList[0][5];
}
//Count students in table row
function cccSS() {
  var ss = document.getElementById("myTable");
  var tbodyRowCount = ss.tBodies[0].rows.length;
  return tbodyRowCount;
}
// Next data show in input
let b = 0;
function nextBtn() {
  var stdNum = cccSS();
  if (b < stdNum) {
    b++;
    document.getElementById("showNNN").value = b;
  }
  var oo = b;
  --oo;
  Mname.value = stdList[oo][0];
  Mid.value = stdList[oo][1];
  Msex.value = stdList[oo][2];
  Mgrade.value = stdList[oo][3];
  Myear.value = stdList[oo][4];
  Mkhname.value = stdList[oo][5];
}
function goBack() {
  if (b > 1) {
    b--;
    document.getElementById("showNNN").value = b;
  }
  var oo = b;
  --oo;
  Mname.value = stdList[oo][0];
  Mid.value = stdList[oo][1];
  Msex.value = stdList[oo][2];
  Mgrade.value = stdList[oo][3];
  Myear.value = stdList[oo][4];
  Mkhname.value = stdList[oo][5];
}
function Fillbox(index) {
  b = index;
  document.getElementById("showNNN").value = index;

  --index;
  Mname.value = stdList[index][0];
  Mid.value = stdList[index][1];
  Msex.value = stdList[index][2];
  Mgrade.value = stdList[index][3];
  Myear.value = stdList[index][4];
  Mkhname.value = stdList[index][5];

  submit.style.display = "none";
  update.style.display = "inline-block";
  dele.style.display = "inline-block";

  // }
}
function NewBox(e) {
  e.preventDefault();
  submit.style.display = "inline-block";
  update.style.display = "none";
  dele.style.display = "none";
  var Mname = document.getElementById("myName");
  var Mkhname = document.getElementById("myKh");
  var Mid = document.getElementById("myID");
  var Msex = document.getElementById("mySex");
  var Mgrade = document.getElementById("myGrade");
  var Myear = document.getElementById("myYear");

  Mname.value = "";
  Mkhname.value = "";
  Mid.value = "";
  Msex.value = "";
  Mgrade.value = "";
  Myear.value = "";
}

function AddStd(e) {
  e.preventDefault();
  firebase
    .database()
    .ref(`${db2}/` + `${db3}/` + Mid.value)
    .set({
      name: Mname.value,
      id: Mid.value,
      sex: Msex.value,
      grade: newgrade.value,
      myKh: Mkhname.value,
    });
  selectAllData();
}

function UpStdgade(e) {
  e.preventDefault();

  firebase
    .database()
    .ref(`${db2}/` + `${db4}/` + Mid.value)
    .update({
      name: Mname.value,
      id: Mid.value,
      sex: Msex.value,
      grade: newgrade.value,
      myKh: Mkhname.value,
    });

  // window.location.reload();
}

function DelStd(e) {
  firebase
    .database()
    .ref(`${db}/` + `${db3}/` + Mid.value)
    .remove()
    .then(function () {
      selectAllData();
      // window.location.reload();
      e.preventDefault();
    });
}
function DelStdAll() {
  firebase
    .database()
    .ref(`${db}/` + `${db3}/`)
    .remove();

  // window.location.reload();
}
//Alert Information
document.getElementById(
  "info"
).innerText = `Please select the right information!`;
if (db == db2) {
  window.onload = selectAllData;
} else {
  document.getElementById("showAlert3").style.display = "block";
  const sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds);
    });
    document.getElementById("showAlert3").style.display = "none";
  };
  sleep(3000);
}
