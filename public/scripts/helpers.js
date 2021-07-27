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
// Create button element

const $button = (cls, type, text) =>
  $('<button>').addClass(cls).attr('type', type).text(text);

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
