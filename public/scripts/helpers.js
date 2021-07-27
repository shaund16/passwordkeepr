//------------------------------------------------------------------------------
// helpers.js
//------------------------------------------------------------------------------

const urlQuery = (obj) => {
  const pairs = [];
  for (const prop in obj) {
    pairs.push(`${prop}=${obj[prop]}`);
  }
  return pairs.length === 0 ? '' : `?${pairs.join('&')}`;
};

//------------------------------------------------------------------------------
// Create label and input element

const $input = (label, id, name, type, obj) => [
  $(`<label for="${id}">${label}</label>`),
  $('<br />'),
  $(`<input id="${id}" name="${name}" type="${type}">`).val(
    obj && obj[name] ? obj[name] : ''
  ),
  $('<br />'),
];

//------------------------------------------------------------------------------
// Create select element

$select = (label, id, name, array, arr_id, arr_val) => {
  const $label = $('<label>').attr('for', id).text(label);
  const $select = $('<select>').attr('id', id).attr('name', name);
  array.forEach(({ [arr_id]: id, [arr_val]: value }) => {
    const $option = $('<option>').attr('value', id).text(value);
    $select.append($option);
  });
  return [$label, $('<br />'), $select, $('<br />')];
};

//------------------------------------------------------------------------------
// Create button element

const $button = (cls, type, text) =>
  $('<button>').addClass(cls).attr('type', type).text(text);

//------------------------------------------------------------------------------
// Create icons

$btnIcon = (cls, type, icon) => {
  const $button = $('<button>').attr('type', type).addClass(cls);
  $button.append($('<i>').addClass(`fas fa-${icon}`));
  return $button;
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

//------------------------------------------------------------------------------
// Set the generated password length

const setGenLength = (view) =>
  function () {
    const length = Math.max(10, $(this).val());
    $(this).val(length);
    view.genLength = length;
  };

//------------------------------------------------------------------------------
// Set the generated password options

const setGenOptions = (view) =>
  function () {
    const $this = $(this);
    const type = $this.attr('class').split(' ')[0];
    if ($this.hasClass('on')) {
      if (view.genOptions.size === 1) return;
      view.genOptions.delete(type);
      $this.removeClass('on');
      return;
    }
    view.genOptions.add(type);
    $this.addClass('on');
  };
