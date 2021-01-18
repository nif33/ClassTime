function showForm(button, form) {
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    button.style.transform = 'rotate(90deg)';
    form.style.display = 'none';
  } else {
    button.classList.add('active');
    button.style.transform = 'rotate(45deg)';
    form.style.display = 'block';
  }
}

function populateList(element, list) {
  for(obj of list) {
    item = makeListItem(obj, list);
    item.dataset.target = '#collapseExample';
    item.dataset.toggle = 'collapse';
    collapse = makeItemCollapse(obj, list);
    element.appendChild(item);
    element.appendChild(collapse);
  }
}

function makeListItem(obj, list) {
  const item = document.createElement('li');
  const text = document.createElement('span');
  const icon = newDeleteIcon(obj, list);
  text.className = 'align-top';
  item.className = 'list-group-item';
  text.innerText = obj.title;
  item.appendChild(text);
  item.appendChild(icon);
  item.onmouseover = function() { icon.style.display = 'block'; }
  item.onmouseout = function() { icon.style.display = 'none'; }
  return item;
}

function makeItemCollapse(obj, list) {
  const collapse = document.createElement('div');
  const card = document.createElement('div');
  collapse.id = "collapseExample";
  collapse.className = "collapse";
  card.className = "card card-body";
  card.innerText = "example text";
  collapse.appendChild(card);
  return collapse;
}

function makeClass(formElement) {
	const formObj = {};
	const formData = new FormData(formElement);
  formObj.title = formData.get('title');
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

function makePin(formElement) {
	const formObj = {};
	const formData = new FormData(formElement);
  formObj.title = formData.get('title');
  formObj.link = formData.get('link');
	return formObj;
}

function newDeleteIcon(obj, list) {
  const icon = document.createElement('span');
  icon.className = 'material-icons close';
  icon.innerText = 'close';
  icon.onclick = function() {
      list.splice(list.indexOf(obj), 1);
      storeData();
  }
  return icon;
}
