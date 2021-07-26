//------------------------------------------------------------------------------
// Main client side script
//------------------------------------------------------------------------------

const $components = {};

$(() => {
  const $body = $('#body');

  // const $navbar = createNavbar();

  const $sidebar = createSideBar();
  updateSideBar($sidebar);

  $components.passwords = createPasswordList();
  updatePasswordList($components);

  // $body.append($navbar);
  $body.append($sidebar);
  $body.append($components.passwords);
});
