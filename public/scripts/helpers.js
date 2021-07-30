//------------------------------------------------------------------------------
// helpers.js
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Create label and input combination

const $input = (label, id, name, type, obj) => {
  const $label = $(`<label for="${id}">${label}</label>`);
  const value = obj && obj[name] ? `value="${obj[name]}"` : '';
  const $comp = $(
    `<input id="${id}" name="${name}" type="${type}" ${value} required>`
  );
  const $div = $('<div class="input">').append($comp);
  return [$label, $div];
};

//------------------------------------------------------------------------------
// Create label and select combination

const $select = (label, id, name, array, arr_id, arr_val) => {
  const $label = $('<label>').attr('for', id).text(label);
  const $select = $('<select>').attr('id', id).attr('name', name);
  array.forEach(({ [arr_id]: id, [arr_val]: value }) => {
    const $option = $('<option>').attr('value', id).text(value);
    $select.append($option);
  });
  const $div = $('<div class="select">').append($select);
  return [$label, $div];
};

//------------------------------------------------------------------------------
// Create button element

const $button = (cls, text, type = 'button') =>
  $('<button>').addClass(cls).attr('type', type).text(text);

//------------------------------------------------------------------------------
// Create button element with icon

const $btnIcon = (cls, icon, type = 'button') => {
  const $button = $('<button>').addClass(cls).attr('type', type);
  $button.append($('<i>').addClass(`fas fa-${icon}`));
  return $button;
};

//------------------------------------------------------------------------------
// Create button element with icon and text

const $btnIconText = (cls, icon, text, type = 'button') =>
  $(`<button class="${cls}" type="${type}">
    <i class="fas fa-${icon}"></i><div>${text}</div>
  </button>`);

//------------------------------------------------------------------------------
// Create a number picker component

const $numberPicker = (cls, value) => {
  return $(`<div class="${cls}">`).append(
    $btnIcon('decrease', 'caret-left'),
    $(`<div class="value">${value}</div>`),
    $btnIcon('increase', 'caret-right')
  );
};

//------------------------------------------------------------------------------
// Generate random password

const genPassword = (length, options) => {
  const src = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    digits: '0123456789',
    symbols: '@#$%^&*-_+=~',
    punct: ',;:.?!`"\'',
    brackets: '()[]{}<>/|\\',
  };
  const selection = [...options].reduce((str, opt) => str + src[opt], '');

  let pwd = '';
  for (let i = 0; i < length; i++) {
    const index = (Math.random() * selection.length) >> 0;
    pwd += selection[index];
  }

  return pwd;
};
