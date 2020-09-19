let classes = [];
let homework = [];
const classButton = document.getElementById('class-toggle');
const homeworkButton = document.getElementById('homework-toggle');
const classList = document.getElementById('class-list');
const homeworkList = document.getElementById('homework-list');

classButton.onclick = function() {
  classList.style.display = 'block';
  homeworkList.style.display = 'none';
}
homeworkButton.onclick = function() {
  classList.style.display = 'none';
  homeworkList.style.display = 'block';
}

chrome.storage.sync.get(['homeworkData', 'classData'], function(result) {
  if(result.classData != undefined) {
    classes = result.classData;
  }
  if(result.homeworkData != undefined) {
    homework = result.homeworkData;
  }
  populateList(classList, classes);
  populateList(homeworkList, homework);
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

// TODO: current deletion does not allow users to use a link more than once
function newDeleteIcon(data) {
  const icon = document.createElement('span');
  icon.className = 'material-icons';
  icon.innerText = 'close';
  icon.onclick = function() {
    for(obj of data) {
      if(obj.link+'close' == icon.parentElement.innerText) {
        data.splice(data.indexOf(obj), 1);
        break;
      }
    }
    chrome.storage.sync.set({homeworkData: homework}, function() {
      chrome.storage.sync.set({classData: classes}, function() {
        icon.parentElement.remove();
      });
    });
  }
  return icon;
}
