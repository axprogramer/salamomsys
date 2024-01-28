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
  localStorage.setItem("stdGradeNew", newGrade);
  window.location.reload();
});
document.getElementById("academicYear").addEventListener("change", function () {
  var newYear = document.getElementById("academicYear").value;
  localStorage.setItem("stdYearNew", newYear);
  window.location.reload();
});
var dbGrade = localStorage.getItem("stdGradeNew"); //Grade
var dbYear = localStorage.getItem("stdYearNew"); //Grade
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

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const usersRef = database.ref('users');
const postsRef = database.ref(`${dbGrade}/` + `${dbYear}/`);
postsRef.on('value', (snapshot) => {
  const posts = snapshot.val();
  stdN0 = 0;
  stdN0TEst = 0;
  $(document).ready(() => {
    snapshot.forEach(function (data) {
      var id = data.val().id;
      var name = data.val().name;
      var sex = data.val().sex;
      var grade = data.val().grade;
      var myKh = data.val().myKh;
      var url = data.val().urlImg;
      let showTable = document.getElementById("showInput5a");
      let showTableView = document.getElementById("showView");
      let noSp = id.replace(/\s+/g, "");
      let noSpname = noSp + "edit";
      let table = `
        <td class="table-bordered border-dark text-center">
        <button data-bs-toggle="modal" data-bs-target="#newStdModal" type="button" class="btn btn-success text-center btn-sm" value="${id}" id="${noSpname}ed"><ion-icon name="create-outline"></ion-icon></button>
        </td>
        <td class="table-bordered border-dark text-center">${++stdN0}</td>
        <td class="table-bordered border-dark khmerFont">${id}</td>
        <td class="table-bordered border-dark">${name}</td>
        <td class="table-bordered border-dark khmerFont">${myKh}</td>
        <td class="table-bordered border-dark text-center">${sex}</td>
        <td class="table-bordered border-dark text-center">${grade}</td>
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
      var stdID = document.getElementById("myID");
      var stdKh = document.getElementById("myKhname");
      var stdEn = document.getElementById("myEnname");
      var stdSex = document.getElementById("mySex");
      var stdImg = document.getElementById("showURL");
      var Img = document.getElementById("showImgUpload");
      //Get Data fill in the box
      const sleep = async (milliseconds) => {
        await new Promise((resolve) => {
          return setTimeout(resolve, milliseconds);
        });
        //Update data
        document
          .getElementById(`${noSpname}ed`)
          .addEventListener("click", function () {
            document.getElementById("exampleModalLabel").innerHTML =
              "Edit Student's Information";
            stdID.value = id;
            stdKh.value = myKh;
            stdEn.value = name;
            stdSex.value = sex;
            stdImg.value = url;
            if (!url) {
              document.getElementById("showImgUpload").src =
                "./assets/img/sample/4x6sample.png";
            } else {

              Img.src = url;
            }
            document.getElementById("updateBtn").style.display = "inline-block";
            document.getElementById("deleteBtn").style.display = "inline-block";
            document.getElementById("addBtn").style.display = "none";
          });
      };
      sleep(1000);

    })
  });
});

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})
$(function () {
  $('[data-bs-toggle="popover"]').popover();
});
function selectAllData() {
  document.getElementById("showInput5a").innerHTML = "";
  stdN0 = 0;
  stdN0View = 0;
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/`)
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var id = CurrentRecord.val().id;
        var name = CurrentRecord.val().name;
        var sex = CurrentRecord.val().sex;
        var grade = CurrentRecord.val().grade;
        var year = CurrentRecord.val().year;
        var myKh = CurrentRecord.val().myKh;
        var url = CurrentRecord.val().urlImg;
        showStd(name, id, sex, grade, year, myKh, url);
      });
    });
}
// window.onload = selectAllData;
var stdN0;
var stdN0View;
var stdN0TEst;
function showStd(name, id, sex, grade, year, myKh, url) {
  let showTable = document.getElementById("showInput5a");
  let showTableView = document.getElementById("showView");
  let noSp = id.replace(/\s+/g, "");
  let noSpname = noSp + "edit";
  let table = `
  <td class="table-bordered border-dark text-center">
  <button data-bs-toggle="modal" data-bs-target="#newStdModal" type="button" class="btn btn-success text-center btn-sm" value="${id}" id="${noSpname}ed"><ion-icon name="create-outline"></ion-icon></button>
    </td>
        <td class="table-bordered border-dark text-center">${++stdN0}</td>
        <td class="table-bordered border-dark khmerFont">${id}</td>
        <td class="table-bordered border-dark">${name}</td>
        <td class="table-bordered border-dark khmerFont">${myKh}</td>
        <td class="table-bordered border-dark text-center">${sex}</td>
        <td class="table-bordered border-dark text-center">${grade}</td>
    `;
  let tableView = `
        <td class="table-bordered border-dark text-center">${++stdN0View}</td>
        <td class="table-bordered border-dark">${name}</td>
        <td class="table-bordered border-dark khmerFont">${myKh}</td>
        <td class="table-bordered border-dark text-center">${sex}</td>
        <td class="table-bordered border-dark text-center">${grade}</td>
    `;
  // document.getElementById("addBtn").addEventListener("click", () => {
  //   var AstdID = document.getElementById("myID");
  //   var AstdKh = document.getElementById("myKhname");
  //   var AstdEn = document.getElementById("myEnname");
  //   var AstdSex = document.getElementById("mySex");
  //   var AstdImg = document.getElementById("showURL");
  //   firebase
  //     .database()
  //     .ref(`${dbGrade}/` + `${dbYear}/` + AstdID.value)
  //     .set({
  //       id: AstdID.value,
  //       name: AstdEn.value,
  //       sex: AstdSex.value,
  //       grade: dbGrade,
  //       myKh: AstdKh.value,
  //       urlImg: AstdImg.value,
  //     });
  //     // window.location.reload();
  //   });
  // setTimeout(function () {
  //   showTable.innerHTML += table;
  //   showTableView.innerHTML += tableView;
  // }, 1500)
  showTable.innerHTML += table;
  showTableView.innerHTML += tableView;

  var stdID = document.getElementById("myID");
  var stdKh = document.getElementById("myKhname");
  var stdEn = document.getElementById("myEnname");
  var stdSex = document.getElementById("mySex");
  var stdImg = document.getElementById("showURL");
  var Img = document.getElementById("showImgUpload");
  //Get Data fill in the box
  const sleep = async (milliseconds) => {
    await new Promise((resolve) => {
      return setTimeout(resolve, milliseconds);
    });
    //Update data
    document
      .getElementById(`${noSpname}ed`)
      .addEventListener("click", function () {
        document.getElementById("exampleModalLabel").innerHTML =
          "Edit Student's Information";
        stdID.value = id;
        stdKh.value = myKh;
        stdEn.value = name;
        stdSex.value = sex;
        stdImg.value = url;
        Img.src = url;

        document.getElementById("updateBtn").style.display = "inline-block";
        document.getElementById("deleteBtn").style.display = "inline-block";
        document.getElementById("addBtn").style.display = "none";
      });
  };
  sleep(1000);
}
//Empty Form
document.getElementById("newBtn").addEventListener("click", () => {
  document.getElementById("myID").value = "";
  document.getElementById("myKhname").value = "";
  document.getElementById("myEnname").value = "";
  document.getElementById("mySex").value = "";
  document.getElementById("showURL").value = "";
  document.getElementById("showImgUpload").src =
    "./assets/img/sample/4x6sample.png";
  document.getElementById("updateBtn").style.display = "none";
  document.getElementById("deleteBtn").style.display = "none";
  document.getElementById("addBtn").style.display = "inline-block";
});
//Add new student
document.getElementById("addBtn").addEventListener("click", () => {
  var AstdID = document.getElementById("myID");
  var AstdKh = document.getElementById("myKhname");
  var AstdEn = document.getElementById("myEnname");
  var AstdSex = document.getElementById("mySex");
  var AstdImg = document.getElementById("showURL");
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/` + AstdID.value)
    .set({
      id: AstdID.value,
      name: AstdEn.value,
      sex: AstdSex.value,
      grade: dbGrade,
      myKh: AstdKh.value,
      urlImg: AstdImg.value,
    });
  // window.location.reload();
});
//Update student's information
document.getElementById("updateBtn").addEventListener("click", () => {
  var AstdID = document.getElementById("myID");
  var AstdKh = document.getElementById("myKhname");
  var AstdEn = document.getElementById("myEnname");
  var AstdSex = document.getElementById("mySex");
  var AstdImg = document.getElementById("showURL");

  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/` + AstdID.value)
    .update({
      id: AstdID.value,
      name: AstdEn.value,
      sex: AstdSex.value,
      grade: dbGrade,
      myKh: AstdKh.value,
      urlImg: AstdImg.value,
    });
  window.location.reload();
});

//Remove student's information
document.getElementById("deleteBtn").addEventListener("click", () => {
  var AstdID = document.getElementById("myID");
  firebase
    .database()
    .ref(`${dbGrade}/` + `${dbYear}/` + AstdID.value)
    .remove();
  window.location.reload();
});

//Import Data
// $(document).on("click", ".table tbody tr td .btn-success", function () {
//   var html = "";
//   html += "<tr> <td class = 'txtcode'> </td>";
//   html += "<td class = 'txtdesc'> </td>";
//   html += "<td class = 'txtprice'> </td>";
//   html += "<td class = 'txtqty' > </td>";
//   html += "<td class = 'code'> </td>";
//   html += "<td class = 'desc'> </td>";
//   html += "<td class = 'price'> </td>";
//   html += "<td class = 'qty' > </td>";
//   html +=
//     "<td> <button type = 'button' class = 'btn btn-success'> Add </button> <button class = 'btn btn-danger' type = 'button'> Remove </button> </td>";
//   html += "</tr>";
//   $(this).parent().parent().after(html);
// });
// $(document).on("click", ".table tbody tr td .btn-danger", function () {
//   $(this).parent().parent().remove();
// });
var ExcelToJSON = function () {
  this.parseExcel = function (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);
        productList = JSON.parse(json_object);
        var studentN0 = 1;
        for (i = 0; i < productList.length; i++) {
          var name = productList[i].name;
          var sex = productList[i].sex;
          var myKh = productList[i].myKh;
          var id = productList[i].myKh;
          var grade = productList[i].grade;
          var tbody = document.getElementById("showTable");
          var trow = document.createElement("tr");
          var td0 = document.createElement("td");
          var td1 = document.createElement("td");
          var td2 = document.createElement("td");
          var td3 = document.createElement("td");
          var td4 = document.createElement("td");
          var td5 = document.createElement("td");
          var td6 = document.createElement("td");
          var td7 = document.createElement("td");
          var td8 = document.createElement("td");
          var td9 = document.createElement("td");
          td3.style.fontFamily = "khmerCN";
          td1.style.fontFamily = "khmerCN";
          td1.contentEditable = true;
          td2.contentEditable = true;
          td3.contentEditable = true;
          td4.contentEditable = true;
          td5.contentEditable = true;
          td0.innerHTML = studentN0++;
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

          tbody.appendChild(trow);
        }
        document
          .getElementById("btnRows")
          .addEventListener("click", function () {
            for (i = 0; i < productList.length; i++) {
              var name = productList[i].name;
              var sex = productList[i].sex;
              var myKh = productList[i].myKh;
              var id = productList[i].myKh;
              var grade = productList[i].grade;
              setTimeout(function () {
                window.location.reload();
              }, 3000);
              firebase
                .database()
                .ref(`${dbGrade}/` + `${dbYear}/` + id)
                .set({
                  id: id,
                  name: name,
                  sex: sex,
                  myKh: myKh,
                  grade: grade,
                });
            }
          });
      });
    };
    reader.onerror = function (ex) {
      console.log(ex);
    };
    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {
  var files = evt.target.files;
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}
document
  .getElementById("upload")
  .addEventListener("change", handleFileSelect, false);

//Print div to PDF
document.getElementById("PrintDoc").addEventListener("click", () => {
  printDoc();
});
function printToPDF() {
  window.print();
}
function generatePDF() {
  const element = document.getElementById("TestView"); // Target the div to convert
  html2pdf()
    .set({
      margin: 10,
      filename: "my-document.pdf",
      image: { type: "jpeg", quality: 5 },
      html2canvas: { scale: 5 }, // Optional: improve image resolution
      jsPDF: { unit: "mm", format: "a4", enableFontSupport: true }, // Set PDF dimensions and format
    })
    .from(element)
    .save();
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
document.getElementById("saveData").addEventListener('click', () => {
  saveToExcel();
})
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
document.getElementById('btnLogout').addEventListener('click',()=>{
  localStorage.removeItem("dbGrade");
  localStorage.removeItem("dbName");
  window.location.replace('index.html')

})
///Admin
var adPut = document.getElementById('secretPass');
function addMin(){
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
            localStorage.setItem('dbSecretData',adPut.value);
            window.location.replace('page-register.html')
          }
        })
      });
    });
}
addMin();