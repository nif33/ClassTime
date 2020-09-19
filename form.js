let classes = [];
let homework = [];
const classForm = document.getElementById('class-form');
const homeworkForm = document.getElementById('homework-form');
const classButton = document.getElementById('class-toggle');
const homeworkButton = document.getElementById('homework-toggle');

chrome.storage.sync.get(['homeworkData', 'classData'], function(result) {
  if(result.classData != undefined) {
    classes = result.classData;
  }
  if(result.homeworkData != undefined) {
    homework = result.homeworkData;
  }
});

classButton.onclick = function() {
  classForm.style.display = 'block';
  homeworkForm.style.display = 'none';
}
homeworkButton.onclick = function() {
  classForm.style.display = 'none';
  homeworkForm.style.display = 'block';
}

classForm.onsubmit = function() {
  classes.push(makeClass(classForm));
  chrome.storage.sync.set({'classData': classes}, function() {
    window.location.href = 'options.html';
  });
}

homeworkForm.onsubmit = function() {
  homework.push(makeHomework(homeworkForm));
  chrome.storage.sync.set({homeworkData: homework}, function() {
    window.location.href = 'options.html'
  });
}

function makeClass(formElement) {
	const formObj = {};
	const formData = new FormData(formElement);
  formObj.day = formData.getAll('day');
  formObj.start = formData.get('start');
  formObj.end = formData.get('end');
  formObj.link = formData.get('link');
	return formObj;
}

function makeHomework(formElement) {
	const formObj = {};
	const formData = new FormData(formElement);
  formObj.title = formData.get('title');
  formObj.link = formData.get('link');
	return formObj;
}
