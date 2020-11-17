const classList = document.getElementById('class-list');
const homeworkList = document.getElementById('homework-list');
const pinList = document.getElementById('pin-list');
const classForm = document.getElementById('class-form');
const homeworkForm = document.getElementById('homework-form');
const pinForm = document.getElementById('pin-form');
let classes = [];
let homework = [];
let pins = [];
getData();

document.getElementById('class-button').onclick = function() { showForm(this, classForm); }
document.getElementById('homework-button').onclick = function() { showForm(this, homeworkForm); }
document.getElementById('pin-button').onclick = function() { showForm(this, pinForm); }

classForm.onsubmit = function() { recordForm(makeClass(this), classes) }
homeworkForm.onsubmit = function() { recordForm(makeHomework(this), homework) }
pinForm.onsubmit = function() { recordForm(makePin(this), pins) }

function recordForm(item, list) {
  if(list.length < 12) {
    list.push(item);
    storeData();
  } else {
    alert("Maximum links reached.")
  }
}
