//------------------------------------------------------------------------------
// jQuery component for a list of passwords
//------------------------------------------------------------------------------

const createPasswordList = () => $('<section id="passwords"></section');

const updatePasswordList = ($components, queryString = '') => {
  const $passwords = $components.passwords;

  // Ajax
  $.get(`/api/passwords${queryString}`).then((json) => {
    $passwords.empty();
    json.passwords.forEach((pwd) => $passwords.append(createPasswordCard(pwd)));
  });
};
