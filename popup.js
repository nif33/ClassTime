chrome.storage.sync.get(['homeworkData', 'classData'], function(result) {
  const homeworkContainer = document.getElementById('homework');
  const classButton = document.getElementById('class');
  const date = new Date();

  for(homeworkObj of result.homeworkData) {
    const button = document.createElement('button');
    button.className = "btn btn-info";
    button.innerText = homeworkObj.title;
    button.onclick = function() { chrome.tabs.create({ url: homeworkObj.link }); };
    homeworkContainer.appendChild(button);
  }

  for(classObj of result.classData) {
    const classLink = timeForClass(date, classObj); // check if there is a class currently
    if(classLink) {
      homeworkContainer.style.display = 'none';
      classButton.style.display = 'block';
      classButton.onclick = function() { chrome.tabs.create({url: classObj.link }); }
    }
  }
});

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
