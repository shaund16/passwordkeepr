//------------------------------------------------------------------------------
// Main client side script
//------------------------------------------------------------------------------

$(() => {
  const state = {
    sidebar: createSideBar(),
    passwords: createPasswordList(),
    query: '',
    sidebar_active: 'all-pwd',
  };

  const $body = $('#body');

  // const $navbar = createNavbar();

  updateSideBar(state);
  updatePasswordList(state);

  // $body.append($navbar);
  $body.append(state.sidebar);
  $body.append(state.passwords);
});
