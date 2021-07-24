//------------------------------------------------------------------------------
// jQuery component for a list of passwords
//------------------------------------------------------------------------------

const $passwords = $('<section id="passwords"><p>Loading...</p></section');

$('#main').append($passwords);

const appendPasswords = (passwords) => {
  $passwords.empty();
  passwords.forEach((pwd) => $passwords.append(createPassword(pwd)));
};
