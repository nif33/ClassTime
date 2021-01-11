chrome.storage.sync.get(['homeworkData', 'classData', 'pinData'], function(result) {
  const homeworkContainer = document.getElementById('homework');
  const classButton = document.getElementById('class');
  const date = new Date();
  console.log(result)

  if(storage_empty(result)) {
    showAddOptions(homeworkContainer);
  }

  for(homeworkObj of result.homeworkData) {
    const button = document.createElement('button');
    button.className = "btn btn-primary";
    button.innerText = homeworkObj.title;
    button.onclick = function() { chrome.tabs.create({ url: homeworkObj.link }); };
    homeworkContainer.appendChild(button);
  }

  document.getElementById('pin-button').onclick = function() {
    console.log('clicked pin')
    for(pinObj of result.pinData) {
        chrome.tabs.create({url: pinObj.link, pinned: true});
    }
  }

  for(classObj of result.classData) {
    const classLink = timeForClass(date, classObj); // check if there is a class currently
    if(classLink) {
      classButton.style.display = 'block';
      classButton.onclick = function() { chrome.tabs.create({url: classObj.link }); }
    }
  }
});

function storage_empty(result) {
  return !result.classData.length && !result.homeworkData.length;
}

function showAddOptions(element) {
  const text = document.createElement('p');
  const options = document.createElement('button');
  text.innerText = 'Add a class in the Options page';
  text.className = 'text-center';
  options.innerText = 'Go to Options';
  options.onclick = function() { chrome.runtime.openOptionsPage() };
  options.className = "btn btn-primary";
  element.appendChild(text);
  element.appendChild(options);
}

function timeForClass(date, classObj) {
  // TODO: there must be a prettier way to do this...
  const s = classObj.start.split(':');
  const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(s[0]), parseInt(s[1]));
  const e = classObj.end.split(':');
  const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(e[0]), parseInt(e[1]));
  if(classObj.day.includes(date.getDay().toString()) &&
    date >= startTime &&
    date <= endTime) {
      return classObj.link;
  }
  return false;
}
