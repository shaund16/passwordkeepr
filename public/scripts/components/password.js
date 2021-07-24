//------------------------------------------------------------------------------
// jQuery component for one password
//------------------------------------------------------------------------------

const createPassword = (password) => {
  return $('<article>')
    .append(
      $('<div>').text(password.site_name).addClass('site_name'),
      $('<div>').text(password.site_url).addClass('site_url'),
      $('<div>').text(password.site_login).addClass('site_login'),
      $('<div>').text(password.site_pwd).addClass('site_pwd')
    )
    .addClass('password')
    .css({ border: '1px solid black' });
};
