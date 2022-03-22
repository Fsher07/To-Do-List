function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());