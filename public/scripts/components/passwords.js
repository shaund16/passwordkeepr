//------------------------------------------------------------------------------
// jQuery component for a list of passwords
//------------------------------------------------------------------------------

const createPasswordList = () => $('<section id="passwords"></section');

const updatePasswordList = (state) => {
  const $passwords = state.passwords;

  // Ajax
  $.get(`/api/passwords${state.query}`).then(function ({ passwords }) {
    $passwords.empty();
    passwords.forEach((pwd) =>
      $passwords.append(createPasswordCard(pwd, state))
    );
  });
};
