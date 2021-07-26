//------------------------------------------------------------------------------
// Main client side script
//------------------------------------------------------------------------------

const $components = {};

$(() => {
  const $body = $('#body');

  // const $navbar = createNavbar();

  $components.sidebar = createSideBar();
  updateSideBar($components);

  $components.passwords = createPasswordList();
  updatePasswordList($components);

  // $body.append($navbar);
  $body.append($components.sidebar);
  $body.append($components.passwords);
});
