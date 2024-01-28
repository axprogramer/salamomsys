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
  localStorage.setItem("stdGradepreview", newGrade);
  window.location.reload();
});
document.getElementById("academicYear").addEventListener("change", function () {
  var newYear = document.getElementById("academicYear").value;
  localStorage.setItem("stdYearpreview", newYear);
  window.location.reload();
});
document.getElementById("myMonth").addEventListener("change", function () {
  var newMonth = document.getElementById("myMonth").value;
  localStorage.setItem("stdMonthpreview", newMonth);
  window.location.reload();
});
var dbGrade = localStorage.getItem("stdGradepreview"); //Grade
var dbYear = localStorage.getItem("stdYearpreview"); //Year
var dbMonth = localStorage.getItem("stdMonthpreview"); //Month
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

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
$(function () {
  $('[data-bs-toggle="popover"]').popover();
});

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
if (dbMonth == '1st Semester Result') {
  window.onload = firstSemesterResultData;
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
if (dbMonth == '2nd Semester Result') {
  window.onload = secondSemesterResultData;
}
if (dbMonth == 'Annual Year') {
  window.onload = annualYear;
}
function novemberData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingNov;
      var wr = data.val().writingNov;
      var li = data.val().listeningNov;
      var re = data.val().readingNov;
      var average = data.val().averageNov;
      var myKh = data.val().myKh;
      var h = data.val().hNov;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averageNov;
      var hRe = getStd.val().hNov;
      var spRe = getStd.val().sportNov;

      var name = getStd.val().name;
      var sp = getStd.val().speakingNov;
      var wr = getStd.val().writingNov;
      var li = getStd.val().listeningNov;
      var re = getStd.val().readingNov;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function decemberData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingDec;
      var wr = data.val().writingDec;
      var li = data.val().listeningDec;
      var re = data.val().readingDec;
      var average = data.val().averageDec;
      var myKh = data.val().myKh;
      var h = data.val().hDec;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averageDec;
      var hRe = getStd.val().hDec;
      var spRe = getStd.val().sportDec;

      var name = getStd.val().name;
      var sp = getStd.val().speakingDec;
      var wr = getStd.val().writingDec;
      var li = getStd.val().listeningDec;
      var re = getStd.val().readingDec;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function januaryData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingJan;
      var wr = data.val().writingJan;
      var li = data.val().listeningJan;
      var re = data.val().readingJan;
      var average = data.val().averageJan;
      var myKh = data.val().myKh;
      var h = data.val().hJan;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averageJan;
      var hRe = getStd.val().hJan;
      var spRe = getStd.val().sportJan;

      var name = getStd.val().name;
      var sp = getStd.val().speakingJan;
      var wr = getStd.val().writingJan;
      var li = getStd.val().listeningJan;
      var re = getStd.val().readingJan;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function februaryData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingfeb;
      var wr = data.val().writingfeb;
      var li = data.val().listeningfeb;
      var re = data.val().readingfeb;
      var average = data.val().averagefeb;
      var myKh = data.val().myKh;
      var h = data.val().hFeb;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averagefeb;
      var hRe = getStd.val().hFeb;
      var spRe = getStd.val().sportfeb;

      var name = getStd.val().name;
      var sp = getStd.val().speakingfeb;
      var wr = getStd.val().writingfeb;
      var li = getStd.val().listeningfeb;
      var re = getStd.val().readingfeb;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function marchData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingmar;
      var wr = data.val().writingmar;
      var li = data.val().listeningmar;
      var re = data.val().readingmar;
      var average = data.val().averagemar;
      var myKh = data.val().myKh;
      var h = data.val().hMar;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averagemar;
      var hRe = getStd.val().hMar;
      var spRe = getStd.val().sportmar;

      var name = getStd.val().name;
      var sp = getStd.val().speakingmar;
      var wr = getStd.val().writingmar;
      var li = getStd.val().listeningmar;
      var re = getStd.val().readingmar;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function aprilData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingma;
      var wr = data.val().writingma;
      var li = data.val().listeningma;
      var re = data.val().readingma;
      var average = data.val().averagema;
      var myKh = data.val().myKh;
      var h = data.val().hApr;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averagema;
      var hRe = getStd.val().hApr;
      var spRe = getStd.val().sportma;

      var name = getStd.val().name;
      var sp = getStd.val().speakingma;
      var wr = getStd.val().writingma;
      var li = getStd.val().listeningma;
      var re = getStd.val().readingma;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function juneData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingjun;
      var wr = data.val().writingjun;
      var li = data.val().listeningjun;
      var re = data.val().readingjun;
      var average = data.val().averagejun;
      var myKh = data.val().myKh;
      var h = data.val().hJun;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averagejun;
      var hRe = getStd.val().hJun;
      var spRe = getStd.val().sportjun;

      var name = getStd.val().name;
      var sp = getStd.val().speakingjun;
      var wr = getStd.val().writingjun;
      var li = getStd.val().listeningjun;
      var re = getStd.val().readingjun;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function julyData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var sp = data.val().speakingjuly;
      var wr = data.val().writingjuly;
      var li = data.val().listeningjuly;
      var re = data.val().readingjuly;
      var average = data.val().averagejuly;
      var myKh = data.val().myKh;
      var h = data.val().hJul;

      if (wr == undefined) {
        wr = 0;
      }
      if (li == undefined) {
        li = 0;
      }
      if (re == undefined) {
        re = 0;
      }
      if (average == undefined) {
        average = 0;
      }
      if (sp == undefined) {
        sp = 0;
      }
      if (h == undefined) {
        h = 0;
      }

      students.push({
        name,
        sex,
        sp,
        wr,
        li,
        re,
        average,
        myKh,
        h,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.sp);
      speak1 = speak1.toFixed(2);
      let speak2 = parseFloat(student.wr);
      speak2 = speak2.toFixed(2);
      let speak3 = parseFloat(student.li);
      speak3 = speak3.toFixed(2);
      let speak4 = parseFloat(student.re);
      speak4 = speak4.toFixed(2);
      let speak5 = parseFloat(student.h);
      speak5 = speak5.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak2}</td>
                <td class="text-center align-middle">${speak3}</td>
                <td class="text-center align-middle">${speak4}</td>
                <td class="text-center align-middle">${speak5}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td style="display: none;">${mention}${student.sex}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p>Monthly Test in <span>${dbMonth}</span></p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Speaking</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Writing</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Listening</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Reading</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Homework</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Average</td>
        <td class="text-center fw-bold TimeNew" style="padding: 8px;">Rank</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().averagejuly;
      var hRe = getStd.val().hJul;
      var spRe = getStd.val().sportjuly;

      var name = getStd.val().name;
      var sp = getStd.val().speakingjuly;
      var wr = getStd.val().writingjuly;
      var li = getStd.val().listeningjuly;
      var re = getStd.val().readingjuly;

      if (!hRe) { hRe = 0 };
      if (!en) { en = 0 };
      if (!spRe) { spRe = 0 };
      if (!sp) { sp = 0 };
      if (!wr) { wr = 0 };
      if (!li) { li = 0 };
      if (!re) { re = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      const getSumEn = getSumFunction(en);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកិច្ចការផ្ទះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${hRe}</td>
        <td class="text-center khmerFont">${spRe}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold">N0</td>
              <td class="border-dark fw-bold">Khmer Name</td>
              <td class="border-dark fw-bold">English Name</td>
              <td class="border-dark fw-bold">Sex</td>
              <td class="border-dark fw-bold">Speaking</td>
              <td class="border-dark fw-bold">Writing</td>
              <td class="border-dark fw-bold">Listening</td>
              <td class="border-dark fw-bold">Reading</td>
              <td class="border-dark fw-bold">Homework</td>
              <td class="border-dark fw-bold">Average</td>
      
      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-center TimeNew">${sp}</td>
        <td class="text-center TimeNew">${wr}</td>
        <td class="text-center TimeNew">${li}</td>
        <td class="text-center TimeNew">${re}</td>
        <td class="text-center TimeNew">${hRe}</td>
        <td class="text-center TimeNew">${en}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function firstSemesterData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var m1se = data.val().my1Se;
      var average = data.val().my1Sa;
      var myKh = data.val().myKh;

      if (m1se == undefined) {
        m1se = 0;
      }
      if (average == undefined) {
        average = 0;
      }

      students.push({
        name,
        sex,
        m1se,
        average,
        myKh,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.m1se);
      speak1 = speak1.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      document.getElementById('he2').innerHTML = 'Grade';
      document.getElementById('he3').innerHTML = 'semester exam';
      document.getElementById('he4').innerHTML = 'semester average';
      document.getElementById('he5').innerHTML = 'rank';
      document.getElementById('he6').innerHTML = 'mention';
      document.getElementById('he7').style.display = 'none';
      document.getElementById('he8').style.display = 'none';
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${dbGrade}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td class="text-center align-middle" style="color: red;">${mention}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p class="text-uppercase">${dbMonth}</p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Exam</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Average</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Rank</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Mention</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbMonth == '1st Semester') { stdMon = 'ឆមាសទី១' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().my1Sa;
      var sc = getStd.val().my1Se;
      var sp = getStd.val().sportFeb;

      var name = getStd.val().name;
      if (!sc) { sc = 0 };
      if (!en) { en = 0 };
      if (!sp) { sp = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      let getSumEn = getSumFunction(en);
      getSumEn = getSumEn.toFixed(2);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      var sport = parseFloat(sp);
      sport = sport.toFixed(2);
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${sport}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold TimeNew text-uppercase">N0</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">Khmer Name</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">English Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Exam</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Average</td>

      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-start TimeNew">${dbGrade}</td>
        <td class="text-center TimeNew">${sc}</td>
        <td class="text-center TimeNew">${getSumEn}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function secondSemesterData() {
  document.getElementById("showInput5a").innerHTML = "";
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var m2se = data.val().my2Se;
      var average = data.val().my2Sa;
      var myKh = data.val().myKh;

      if (m2se == undefined) {
        m2se = 0;
      }
      if (average == undefined) {
        average = 0;
      }

      students.push({
        name,
        sex,
        m2se,
        average,
        myKh,
      });
    });

    students.sort(function (a, b) { return b.average - a.average });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].average;
      let studentsWithRank = students.filter(
        (student) => student.average === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.average);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      let speak1 = parseFloat(student.m2se);
      speak1 = speak1.toFixed(2);
      let speak6 = parseFloat(student.average);
      speak6 = speak6.toFixed(2);
      document.getElementById('he2').innerHTML = 'Grade';
      document.getElementById('he3').innerHTML = 'semester exam';
      document.getElementById('he4').innerHTML = 'semester average';
      document.getElementById('he5').innerHTML = 'rank';
      document.getElementById('he6').innerHTML = 'mention';
      document.getElementById('he7').style.display = 'none';
      document.getElementById('he8').style.display = 'none';
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${dbGrade}</td>
                <td class="text-center align-middle">${speak1}</td>
                <td class="text-center align-middle">${speak6}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td class="text-center align-middle" style="color: red;">${mention}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p class="text-uppercase">${dbMonth}</p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Full Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Exam</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Average</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Rank</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Mention</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbMonth == '2nd Semester') { stdMon = 'ឆមាសទី២' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().my2Sa;
      var sc = getStd.val().my2Se;
      var sp = getStd.val().sportJun;

      var name = getStd.val().name;
      if (!sc) { sc = 0 };
      if (!en) { en = 0 };
      if (!sp) { sp = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      let getSumEn = getSumFunction(en);
      getSumEn = getSumEn.toFixed(2);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      var sport = parseFloat(sp);
      sport = sport.toFixed(2);
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${sport}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold TimeNew text-uppercase">N0</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">Khmer Name</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">English Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Exam</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Average</td>

      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-start TimeNew">${dbGrade}</td>
        <td class="text-center TimeNew">${sc}</td>
        <td class="text-center TimeNew">${getSumEn}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function firstSemesterResultData() {
  document.getElementById("showInput5a").innerHTML = "";
  document.getElementById('btnSave').disabled = true;
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      // report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var id = data.val().id;
      var name = data.val().name;
      var sex = data.val().sex;
      var m1se = data.val().my1Se;
      var average = data.val().my1Sa;
      var myKh = data.val().myKh;

      var avNov = data.val().averageNov;
      var avDec = data.val().averageDec;
      var avJan = data.val().averageJan;
      var avfeb = data.val().averagefeb;

      if (!average) { average = '0' };
      if (!avNov) { avNov = '0' };
      if (!avDec) { avDec = '0' };
      if (!avJan) { avJan = '0' };
      if (!avfeb) { avfeb = '0' };

      //Total 4 months
      var su =
        parseFloat(avNov) +
        parseFloat(avDec) +
        parseFloat(avJan) +
        parseFloat(avfeb);
      var sum4Mon = su / 4;
      sum4Mon = sum4Mon.toFixed(2);
      //Total average of 4 and Semester
      var av =
        parseFloat(average) +
        parseFloat(sum4Mon);
      var avRe = av / 2;
      avRe = avRe.toFixed(2);
      //Set Data to Firebase
      firebase
        .database()
        .ref(`${dbGrade}/` + `${dbYear}/` + id)
        .update({
          firstResult: avRe,
        });
      students.push({
        name,
        sex,
        sum4Mon,
        average,
        myKh,
        avRe,
      });
    });

    students.sort(function (a, b) { return b.avRe - a.avRe });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].avRe;
      let studentsWithRank = students.filter(
        (student) => student.avRe === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.avRe);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      document.getElementById('he2').innerHTML = 'Grade';
      document.getElementById('he3').innerHTML = 'SEMESTER EXAM AVERAGE';
      document.getElementById('he4').innerHTML = 'MONTHLY AVERAGE IN SEMESTER';
      document.getElementById('he5').innerHTML = 'SEMESTER AVERAGE';
      document.getElementById('he6').innerHTML = 'RANK';
      document.getElementById('he7').innerHTML = 'MENTION';
      document.getElementById('he8').style.display = 'none';
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${dbGrade}</td>
                <td class="text-center align-middle">${student.average}</td>
                <td class="text-center align-middle">${student.sum4Mon}</td>
                <td class="text-center align-middle">${student.avRe}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td class="text-center align-middle" style="color: red;">${mention}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p class="text-uppercase">${dbMonth}</p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;width: 35rem;">Full Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">SEMESTER EXAM AVERAGE</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">MONTHLY AVERAGE IN SEMESTER</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">SEMESTER AVERAGE</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Rank</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Mention</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbMonth == '1st Semester') { stdMon = 'ឆមាសទី១' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().my1Sa;
      var sc = getStd.val().my1Se;
      var sp = getStd.val().sportFeb;

      var name = getStd.val().name;
      if (!sc) { sc = 0 };
      if (!en) { en = 0 };
      if (!sp) { sp = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      let getSumEn = getSumFunction(en);
      getSumEn = getSumEn.toFixed(2);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      var sport = parseFloat(sp);
      sport = sport.toFixed(2);
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${sport}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold TimeNew text-uppercase">N0</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">Khmer Name</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">English Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Exam</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Average</td>

      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-start TimeNew">${dbGrade}</td>
        <td class="text-center TimeNew">${sc}</td>
        <td class="text-center TimeNew">${getSumEn}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function secondSemesterResultData() {
  document.getElementById("showInput5a").innerHTML = "";
  document.getElementById('btnSave').disabled = true;
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      // report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var id = data.val().id;
      var name = data.val().name;
      var sex = data.val().sex;
      var m1se = data.val().my2Se;
      var average = data.val().my2Sa;
      var myKh = data.val().myKh;

      var avMar = data.val().averagemar;
      var avAp = data.val().averagema;
      var avJun = data.val().averagejun;
      var avJul = data.val().averagejuly;

      if (!average) { average = '0' };
      if (!avMar) { avMar = '0' };
      if (!avAp) { avAp = '0' };
      if (!avJun) { avJun = '0' };
      if (!avJul) { avJul = '0' };

      //Total 4 months
      var su =
        parseFloat(avMar) +
        parseFloat(avAp) +
        parseFloat(avJun) +
        parseFloat(avJul);
      var sum4Mon = su / 4;
      sum4Mon = sum4Mon.toFixed(2);
      //Total average of 4 and Semester
      var av =
        parseFloat(average) +
        parseFloat(sum4Mon);
      var avRe = av / 2;
      avRe = avRe.toFixed(2);
      //Push data to Firebase
      firebase
        .database()
        .ref(`${dbGrade}/` + `${dbYear}/` + id)
        .update({
          secondResult: avRe,
        });

      students.push({
        name,
        sex,
        sum4Mon,
        average,
        myKh,
        avRe,
      });
    });

    students.sort(function (a, b) { return b.avRe - a.avRe });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].avRe;
      let studentsWithRank = students.filter(
        (student) => student.avRe === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }

      var my = parseFloat(student.avRe);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      document.getElementById('he2').innerHTML = 'Grade';
      document.getElementById('he3').innerHTML = 'SEMESTER EXAM AVERAGE';
      document.getElementById('he4').innerHTML = 'MONTHLY AVERAGE IN SEMESTER';
      document.getElementById('he5').innerHTML = 'SEMESTER AVERAGE';
      document.getElementById('he6').innerHTML = 'RANK';
      document.getElementById('he7').innerHTML = 'MENTION';
      document.getElementById('he8').style.display = 'none';
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${dbGrade}</td>
                <td class="text-center align-middle">${student.average}</td>
                <td class="text-center align-middle">${student.sum4Mon}</td>
                <td class="text-center align-middle">${student.avRe}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td class="text-center align-middle" style="color: red;">${mention}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p class="text-uppercase">${dbMonth}</p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;width: 35rem;">Full Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">SEMESTER EXAM AVERAGE</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">MONTHLY AVERAGE IN SEMESTER</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">SEMESTER AVERAGE</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Rank</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Mention</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbMonth == '1st Semester') { stdMon = 'ឆមាសទី១' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().my1Sa;
      var sc = getStd.val().my1Se;
      var sp = getStd.val().sportFeb;

      var name = getStd.val().name;
      if (!sc) { sc = 0 };
      if (!en) { en = 0 };
      if (!sp) { sp = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      let getSumEn = getSumFunction(en);
      getSumEn = getSumEn.toFixed(2);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំខែ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      var sport = parseFloat(sp);
      sport = sport.toFixed(2);
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${sport}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold TimeNew text-uppercase">N0</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">Khmer Name</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">English Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Exam</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Average</td>

      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-start TimeNew">${dbGrade}</td>
        <td class="text-center TimeNew">${sc}</td>
        <td class="text-center TimeNew">${getSumEn}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}
function annualYear() {
  document.getElementById("showInput5a").innerHTML = "";
  document.getElementById('btnSave').disabled = true;

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      nov(AllRecords);
      // report(AllRecords);
    });
  function nov(datas) {
    let tbody = document.getElementById("showInput5a");
    let header = document.getElementById("printHeader");
    let footer = document.getElementById("printFooter");
    let body = document.getElementById("printBody");
    let No = 0;
    let students = [];

    datas.forEach((data) => {
      var name = data.val().name;
      var sex = data.val().sex;
      var seme1 = data.val().firstResult;
      var seme2 = data.val().secondResult;
      var myKh = data.val().myKh;

      if (seme1 == undefined) {
        seme1 = 0;
      }
      if (seme2 == undefined) {
        seme2 = 0;
      }
      let sum = 
      parseFloat(seme1)+parseFloat(seme2);
      let toSum = sum /2;
      toSum = toSum.toFixed(2);

      students.push({
        name,
        sex,
        seme1,
        seme2,
        toSum,
        myKh,
      });
    });

    students.sort(function (a, b) { return b.toSum - a.toSum });

    for (let i = 0; i < students.length; i++) {
      let avg = students[i].toSum;
      let studentsWithRank = students.filter(
        (student) => student.toSum === avg
      );
      for (let student of studentsWithRank) {
        student.Rank = i + 1;
      }
      i += studentsWithRank.length - 1;
    }

    students.forEach((student) => {
      No++;
      var mention = "";
      //Set Signature
      if (['5A', '5B'].includes(dbGrade)) {
        var signature = "./assets/img/Mysignature.png";
      }
      var my = parseFloat(student.toSum);
      if (my <= 4.9) {
        mention = "Fail"
      } else if (my <= 5) {
        mention = "Poor"
      } else if (my <= 6.4) {
        mention = "Faily Good";
      } else if (my <= 7.9) {
        mention = "Good";
      } else if (my <= 9.4) {
        mention = "Very Good";
      } else if (my <= 10) {
        mention = "Excellent";
      }

      document.getElementById('he2').innerHTML = 'Grade';
      document.getElementById('he3').innerHTML = '1ST SEMESTER AVERAGE';
      document.getElementById('he4').innerHTML = '2ND SEMESTER AVERAGE';
      document.getElementById('he5').innerHTML = 'ANNUAL AVERAGE';
      document.getElementById('he6').innerHTML = 'rank';
      document.getElementById('he7').innerHTML = 'Mention'
      document.getElementById('he8').style.display = 'none';
      //Preview Only
      let tr = `
                <td class="text-center">${No}</td>
                <td class="text-uppercase" style="padding:5px;">${student.name}</td>
                <td class="text-center">${student.sex}</td>
                <td class="text-center align-middle">${dbGrade}</td>
                <td class="text-center align-middle">${student.seme1}</td>
                <td class="text-center align-middle">${student.seme2}</td>
                <td class="text-center align-middle">${student.toSum}</td>
                <td class="text-center align-middle" style="color: red;">${student.Rank}</td>
                <td class="text-center align-middle" style="color: red;">${mention}</td> 
        `;
      tbody.innerHTML += tr;
      //Input Header
      let partHead = `
          <table class="table-borderless newtable" style="font-weight: bold;">
            <tr>
              <td style="width: 35vw;">
                <p></p>
              </td>
              <td style="width: 41vw;">
                <p></p>
              </td>
              <td class="text-center">
                <p>Kingdom of Cambodia</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Department of Education of Sen Sok</p>
              </td>
              <td>
                <p></p>
              </td>
              <td class="text-center">
                <p>Nation Religion King</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>SalaMOM School</p>
              </td>
              <td class="text-center">
                <p class="text-uppercase">${dbMonth}</p>
              </td>
              <td class="text-center">
                <p class="khmerTak">3</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Grade <span>${dbGrade}</span></p>
              </td>
              <td class="text-center">
                <p>Academic Year <span>${dbYear}</span></p>
              </td>
              <td>
                <p></p>
              </td>
            </tr>
          </table>
      `;
      //Input Body
      let partBody = `
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">N0</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;width: 35rem;">Full Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">1ST SEMESTER AVERAGE</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">2ND SEMESTER AVERAGE</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">ANNUAL AVERAGE</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Rank</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Mention</td>

      `;
      //Input Footer
      let partFooter = `
           <table class="newtableFooter table-borderless">
            <tr>
              <td>

              </td>
              <td>
                Number of Student: <span id="TotalSs"></span> Female: <span id="TotalSF"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades higher than the average: <span id="TotalSs2"></span>
                Female: <span id="TotalSF2"></span>
              </td>
            </tr>
            <tr>
              <td>

              </td>
              <td>
                Number of grades lower than the average: <span id="sFail"></span>
                Female: <span id="fFails"></span>
              </td>
            </tr>
          </table>
          <br>
          <table class="newtableFooter2 table-borderless">
            <tr>
              <td></td>
              <td>
                Phnom Penh, Date: <span id="showDate"></span>
              </td>
            </tr>
            <tr>
              <td>
                Approved by
              </td>
              <td>
                Signature of class teacher
              </td>
            </tr>
            <tr>
              <td>
                Principal of SalaMOM
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <img src="${signature}" alt="" style="width: 8em;">

              </td>
            </tr>
          </table>
      `;
      //For Printing
      var tablePrinting = document.getElementById('printingPage');
      tablePrinting.innerHTML += tr;
      header.innerHTML = partHead;
      footer.innerHTML = partFooter;
      body.innerHTML = partBody;

    });
  }
  function report(getData) {
    let tbody = document.getElementById("printingPageReport");
    let header = document.getElementById("printHeaderReport");
    let bodyResult = document.getElementById("saveHeadResult");
    let tbodyResult = document.getElementById("saveRe");
    let body = document.getElementById("printBodyReport");
    let N0 = 0;
    if (dbMonth == 'January') { stdMon = 'មករា' };
    if (dbMonth == 'February') { stdMon = 'កុម្ភៈ' };
    if (dbMonth == 'March') { stdMon = 'មិនា' };
    if (dbMonth == 'April-May') { stdMon = 'មេសា-ឧសភា' };
    if (dbMonth == 'June') { stdMon = 'មិថុនា' };
    if (dbMonth == 'July') { stdMon = 'កក្កដា' };
    if (dbMonth == 'November') { stdMon = 'វិច្ឆិកា' };
    if (dbMonth == 'December') { stdMon = 'ធ្នូ' };
    if (dbMonth == '1st Semester') { stdMon = 'ឆមាសទី១' };
    if (dbGrade == '1A') { stdGr = '១ក' };
    if (dbGrade == '1B') { stdGr = '១ខ' };
    if (dbGrade == '2A') { stdGr = '២ក' };
    if (dbGrade == '2B') { stdGr = '២ខ' };
    if (dbGrade == '3A') { stdGr = '៣ក' };
    if (dbGrade == '3B') { stdGr = '៣ខ' };
    if (dbGrade == '4A') { stdGr = '៤ក' };
    if (dbGrade == '4B') { stdGr = '៤ខ' };
    if (dbGrade == '5A') { stdGr = '៥ក' };
    if (dbGrade == '5B') { stdGr = '៥ខ' };
    if (dbGrade == '6A') { stdGr = '៦ក' };
    if (dbGrade == '6B') { stdGr = '៦ខ' };
    getData.forEach((getStd) => {
      var khname = getStd.val().id;
      var sex = getStd.val().sex;
      var en = getStd.val().my1Sa;
      var sc = getStd.val().my1Se;
      var sp = getStd.val().sportFeb;

      var name = getStd.val().name;
      if (!sc) { sc = 0 };
      if (!en) { en = 0 };
      if (!sp) { sp = 0 };
      if (sex == 'M') { sex = 'ប' };
      if (sex == 'F') { sex = 'ស' };

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
      }

      let getSumEn = getSumFunction(en);
      getSumEn = getSumEn.toFixed(2);

      //Header
      N0++;
      let h = `
        <table class="table table-borderless khmerFont text-center" style="overflow: auto;font-size: 22px;font-weight: bold;">
          <tr>
              <td class="text-center line-set" style="font-size: 2vw;">
                ពិន្ទុប្រចាំ ${stdMon} ថ្នាក់ទី ${stdGr}
              </td>
          </tr>
        </table>
      `;
      header.innerHTML = h;
      //Body
      let b = `
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ល.រ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ឈ្មោះ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ភេទ</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុភាសាអង់គ្លេស</td>
        <td class="text-center fw-bold khmerFont" style="padding: 8px;">ពិន្ទុកីឡា</td>
      `;
      body.innerHTML = b;
      //tBody
      var sport = parseFloat(sp);
      sport = sport.toFixed(2);
      let tb = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-center khmerFont">${sex}</td>
        <td class="text-center khmerFont">${getSumEn}</td>
        <td class="text-center khmerFont">${sport}</td>
      `;
      tbody.innerHTML += tb;
      //Save Result
      let sR = `
      <td class="border-dark fw-bold TimeNew text-uppercase">N0</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">Khmer Name</td>
        <td class="border-dark fw-bold TimeNew text-uppercase">English Name</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Sex</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Grade</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Exam</td>
        <td class="text-center fw-bold TimeNew text-uppercase" style="padding: 8px;">Semester Average</td>

      `;
      bodyResult.innerHTML = sR;
      let tsR = `
        <td class="text-center">${N0}</td>
        <td class="text-start khmerFont">${khname}</td>
        <td class="text-start TimeNew">${name}</td>
        <td class="text-center TimeNew">${sex}</td>
        <td class="text-start TimeNew">${dbGrade}</td>
        <td class="text-center TimeNew">${sc}</td>
        <td class="text-center TimeNew">${getSumEn}</td>

      `;
      tbodyResult.innerHTML += tsR;
    })
  }
  //Get Pass and Fail Students
  $(document).ready(function () {
    var Sf = "F";
    var failM = "FailM";
    var failF = "FailF";
    const sleep = async (milliseconds) => {
      await new Promise(resolve => {
        return setTimeout(resolve, milliseconds);
      });
      getOccurance(Sf);

    };
    sleep(3000);
    function getOccurance(Sf) {
      getOccurancefailM(failM);
      getOccurancefailF(failF);
      var f2 = document.getElementById("ssTotal").innerHTML;
      var m1 = document.getElementById("fMst").innerHTML;
      var m2 = document.getElementById("ffst").innerHTML;
      var tfail = document.getElementById("fasTotal");
      var pass = document.getElementById("PsTotal");
      var showw = document.getElementById("fFails");
      var sumFs = parseFloat(m1) + parseFloat(m2);
      var sum = f2 - sumFs;
      pass.innerHTML = sum;
      sumFs = sumFs.toString().padStart(2, "0");
      tfail.innerHTML = sumFs;
      showw.innerHTML = m2;
      sum = sum.toString().padStart(2, "0")
      document.getElementById('TotalSs2').innerHTML = sum;

      var noOfOccurance = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (Sf == $.trim($(obj).text())) noOfOccurance++;

      });

      var show = document.getElementById("TotalSF");
      noOfOccurance = noOfOccurance.toString().padStart(2, "0");
      show.innerHTML = noOfOccurance;
      var show3 = document.getElementById("TotalSF2");
      var show4 = document.getElementById("fsTotal");
      var f1 = document.getElementById("sFail");
      // show3.innerHTML = noOfOccurance;
      show4.innerHTML = noOfOccurance;
      sumFs = sumFs.toString().padStart(2, "0");
      f1.innerHTML = sumFs;
      let girlFail = parseFloat(noOfOccurance) - parseFloat(sumFs);
      girlFail = girlFail.toString().padStart(2, "0");
      show3.innerHTML = girlFail;
    }
    // Male
    function getOccurancefailM(failM) {
      var failSM = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failM == $.trim($(obj).text())) failSM++;

      });

      var show2 = document.getElementById("fMst");
      show2.innerHTML = `${0}${failSM}`;

    }
    // Female
    function getOccurancefailF(failF) {
      var failSF = 0;

      $("#showInput5a td").each(function (ind, obj) {
        if (failF == $.trim($(obj).text())) failSF++;

      });

      var show2 = document.getElementById("ffst");
      failSF = failSF.toString().padStart(2, "0");
      show2.innerHTML = failSF;

    }

  })
  function totalStudent() {
    var ss = document.getElementById("Test");
    var tbodyRowCount = ss.tBodies[0].rows.length;
    // var rowCount = document.getElementById('tbodyView').rows.length;
    var show = document.getElementById("TotalSs");
    var show3 = document.getElementById("ssTotal");
    tbodyRowCount = tbodyRowCount.toString().padStart(2, "0");
    show.innerHTML = tbodyRowCount;
    show3.innerHTML = tbodyRowCount;
    // var show2 = document.getElementById("TotalSs2");
    // show2.innerHTML = tbodyRowCount;

  }
  const sleep = async (milliseconds) => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds);
    });
    totalStudent();

  };
  sleep(2000);

}


document.getElementById('PrintResult').addEventListener('click', () => {
  printResult();
})
document.getElementById('PrintReport').addEventListener('click', () => {
  printReport();
})
function printResult() {
  var newstr = document.getElementById("previewPrintResult").innerHTML;
  var oldstr = document.body.innerHTML;
  document.body.innerHTML = newstr;
  window.print();
  document.body.innerHTML = oldstr;
  window.location.reload();
  return false;
}
function printReport() {
  var newstr = document.getElementById("printReport").innerHTML;
  var oldstr = document.body.innerHTML;
  document.body.innerHTML = newstr;
  window.print();
  document.body.innerHTML = oldstr;
  window.location.reload();
  return false;
}
// Save to excel
document.getElementById("saveDataResutl").addEventListener('click', () => {
  saveToExcelResult();
})
document.getElementById("saveDataReport").addEventListener('click', () => {
  saveToExcelReport();
})
function saveToExcelResult(type, fn, dl) {
  var elt = document.getElementById("saveResult");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || `${dbGrade}/ ` + `${dbYear}/Result.` + (type || "xlsx"));
}
function saveToExcelReport(type, fn, dl) {
  var elt = document.getElementById("saveReport");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || `${dbGrade}/ ` + `${dbYear}/Report.` + (type || "xlsx"));
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