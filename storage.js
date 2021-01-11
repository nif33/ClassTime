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

function storeData() {
  chrome.storage.sync.set({classData: classes, homeworkData: homework, pinData: pins}, function() {
    window.location.href = 'options.html';
  });
}
