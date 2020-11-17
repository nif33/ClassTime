function getData() {
  chrome.storage.sync.get(['homeworkData', 'classData', 'pinData'], function(result) {
    if(result.classData != undefined) {
      classes = result.classData;
    }
    if(result.homeworkData != undefined) {
      homework = result.homeworkData;
    }
    if(result.pinData != undefined) {
      pins = result.pinData;
    }
    populateList(classList, classes);
    populateList(homeworkList, homework);
    populateList(pinList, pins);
  });
}

// TODO: probably don't need to set all variables when only one is updated
function storeData() {
  chrome.storage.sync.set({classData: classes, homeworkData: homework, pinData: pins}, function() {
    window.location.href = 'options.html';
  });
}

function removeData(){
  chrome.storage.sync.set({classData: classes, homeworkData: homework, pinData: pins}, function() {
    icon.parentElement.remove();
  });
}

/*
chrome.storage.sync.get(['homeworkData', 'classData', 'pinData'], function(result) {
  if(result.classData != undefined) {
    classes = result.classData;
  }
  if(result.homeworkData != undefined) {
    homework = result.homeworkData;
  }
  if(result.pinData != undefined) {
    pins = result.pinData;
  }
  populateList(classList, classes);
  populateList(homeworkList, homework);
  populateList(pinList, pins);
});

function populateList(list, data) {
  for(obj of data) {
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerText = obj.link;
    item.appendChild(newDeleteIcon(data));
    list.appendChild(item);
  }
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

pinForm.onsubmit = function() {
  pins.push(makePin(pinForm));
  chrome.storage.sync.set({pinData: pins}, function() {
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
*/
