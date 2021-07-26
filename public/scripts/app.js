//------------------------------------------------------------------------------
// Main client side script
//------------------------------------------------------------------------------

$(() => {
  const state = {};

  createBrowsePasswords(state, 'pwd-browse');
  createSidebar(state, 'sidebar');

  const $body = $('#body');

  console.log(state.browse);
  state.browse.update();

  console.log(state.sidebar);
  state.sidebar.update();

  $body.append(state.sidebar.component);
  $body.append(state.browse.component);
});
