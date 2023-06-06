let db;
let dbOpenRequest = indexedDB.open("Gallery", 1);

dbOpenRequest.onupgradeneeded = function (e) {
  //alert("Inside on upgrade");
  db = e.target.result;
 // console.log(db);
  db.createObjectStore("Media", { keyPath: "mid" });
};
dbOpenRequest.onsuccess = function (e) {
//   alert("Inside on success");
  db = e.target.result;
};
dbOpenRequest.onerror = function (e) {
  alert("Inside on error");
};
