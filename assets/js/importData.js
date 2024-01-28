const firebaseConfig = {
    apiKey: "AIzaSyAJ61CR4hcHajBf8T02wl-REVx8SnRxklE",
    authDomain: "useradmin-cd653.firebaseapp.com",
    databaseURL: "https://useradmin-cd653-default-rtdb.firebaseio.com",
    projectId: "useradmin-cd653",
    storageBucket: "useradmin-cd653.appspot.com",
    messagingSenderId: "51017691764",
    appId: "1:51017691764:web:9f322ae1ee6c00c5ce5721"
};

firebase.initializeApp(firebaseConfig);
//Month and Times for Activity
document.getElementById('myGradeAct').addEventListener('change', function () {
    var gradeact = document.getElementById('myGradeAct').value;
    localStorage.setItem('importgrade', gradeact);
    window.location.reload();

})
document.getElementById('myYearAct').addEventListener('change', function () {
    var yeareact = document.getElementById('myYearAct').value;
    localStorage.setItem('importyear', yeareact);
    window.location.reload();

})

var dbgradeAct = localStorage.getItem('importgrade'); // grade activity
var dbyearAct = localStorage.getItem('importyear'); // year activity
document.getElementById('myGradeAct').value = dbgradeAct;
document.getElementById('myYearAct').value = dbyearAct;
//Save data to firebase
document.getElementById("alertMagWait").style.display = "none";
$(document).on('click', '.table tbody tr td .btn-success', function () {
    var html = '';
    html += "<tr> <td class = 'txtcode'> </td>"
    html += "<td class = 'txtdesc'> </td>"
    html += "<td class = 'txtprice'> </td>"
    html += "<td class = 'txtqty' > </td>"
    html += "<td class = 'code'> </td>"
    html += "<td class = 'desc'> </td>"
    html += "<td class = 'price'> </td>"
    html += "<td class = 'qty' > </td>"
    html += "<td> <button type = 'button' class = 'btn btn-success'> Add </button> <button class = 'btn btn-danger' type = 'button'> Remove </button> </td>"
    html += "</tr>"
    $(this).parent().parent().after(html)
})
$(document).on('click', '.table tbody tr td .btn-danger', function () {
    $(this).parent().parent().remove()
})
var ExcelToJSON = function () {

    this.parseExcel = function (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function (sheetName) {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                productList = JSON.parse(json_object);
                var studentN0 = 1;
                for (i = 0; i < productList.length; i++) {
                    var name = productList[i].name;
                    var sex = productList[i].sex;
                    var myKh = productList[i].myKh;
                    var id = productList[i].myKh;
                    var grade = productList[i].grade;
                    var tbody = document.getElementById('showTable');
                    var trow = document.createElement('tr');
                    var td0 = document.createElement('td');
                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');
                    var td3 = document.createElement('td');
                    var td4 = document.createElement('td');
                    var td5 = document.createElement('td');
                    var td6 = document.createElement('td');
                    var td7 = document.createElement('td');
                    var td8 = document.createElement('td');
                    var td9 = document.createElement('td');
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
                document.getElementById('btnRows').addEventListener('click', function () {
                    for (i = 0; i < productList.length; i++) {
                        var name = productList[i].name;
                        var sex = productList[i].sex;
                        var myKh = productList[i].myKh;
                        var id = productList[i].myKh;
                        var grade = productList[i].grade;
                        setTimeout(function () {
                            window.location.reload();
                        }, 3000);
                        firebase.database().ref(`${dbgradeAct}/` + `${dbyearAct}/` + id).set(
                            {
                                id: id,
                                name: name,
                                sex: sex,
                                myKh: myKh,
                                grade: grade,
                            },
                        )
                    }

                })

            })
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
document.getElementById('upload').addEventListener('change', handleFileSelect, false);  