var files = [];
var reader = new FileReader();
var nameBox = document.getElementById("nameBox");
var myimg = document.getElementById("showImgUpload");
var SelBtn = document.getElementById("seleImg");
var extlab = document.getElementById("extlab");
var proglab = document.getElementById("showPercent");
var UpBtn = document.getElementById("uploadBtn");
var showURL = document.getElementById("showURL");
var showCheck = document.getElementById("showCheck");

var input = document.createElement("input");
input.type = "file";

input.onchange = (e) => {
  files = e.target.files;

  var extention = GetFileExt(files[0]);
  var name = GetFileName(files[0]);
  nameBox.value = name;
  extlab.innerHTML = extention;
  reader.readAsDataURL(files[0]);
  UploadProcess();
};
reader.onload = function () {
  myimg.src = reader.result;
};
SelBtn.onclick = function () {
  input.click();
};
function GetFileExt(file) {
  var temp = file.name.split(".");
  var ext = temp.slice(temp.lenth - 1, temp.lenth);
  return "." + ext[1];
}
function GetFileName(file) {
  var temp = file.name.split(".");
  var fname = temp.slice(0, -1).join(".");
  return fname;
}
async function UploadProcess() {
  var ImgToUpload = files[0];
  var ImgName = nameBox.value + extlab.innerHTML;
  const metaData = {
    contenType: ImgToUpload.type,
  };
  const storage = firebase.storage().ref();
  // const stroageRef = sRef(storage, 'StdImages/' + `${dbYear}/` + `${dbGrade}/` + ImgName);
  // const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);
  var UploadTask = storage
    .child("StdImages/" + `${dbYear}/` + `${dbGrade}/` + ImgName)
    .put(ImgToUpload);

  UploadTask.on(
    "state-changed",
    (snapshot) => {
      var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progess = parseFloat(progess).toFixed(0);
      proglab.innerHTML = "Upload: " + progess + " %";
    },
    (error) => {
      alert("error: image not uploaded!");
    },
    () => {
      UploadTask.snapshot.ref.getDownloadURL().then((getDownloadURL) => {
        showURL.value = getDownloadURL;
        // proglab.innerHTML = `Upload completed!<img style="width: 75px;" src="./assets/img/sample/completedPer.gif">`;
        setTimeout(function () {
          proglab.innerHTML = "";
        }, 1000);
      });
    }
  );
}
UpBtn.onclick = UploadProcess;
var dbGrade = localStorage.getItem("newGrade");
var dbYear = localStorage.getItem("newYear");
