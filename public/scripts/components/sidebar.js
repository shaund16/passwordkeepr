//------------------------------------------------------------------------------
// jQuery component for a side bar with filters
//------------------------------------------------------------------------------

const filterPasswords =
  (query = '') =>
  () => {
    updatePasswordList($components, query);
  };

const createSideBar = () => $('<section id="side">');

const updateSideBar = ($components) => {
  const $sidebar = $components.sidebar;

  // Ajax
  $.get('/api/users/filters').then(({ orgs, categories }) => {
    // Standard buttons
    const $add = $('<button class="add-pwd">Add password</button>').on(
      'click',
      () => {}
    );
    const $all = $('<button class="all-pwd">All password</button>').on(
      'click',
      filterPasswords()
    );
    const $own = $('<button class="own-pwd">My passwords</button>').on(
      'click',
      filterPasswords('?type=own')
    );

    $sidebar
      .empty()
      .append($add, $('<hr />'), $all, $own, $('<hr />'))
      .css({ border: '1px solid blue', margin: '1em' });

    // Append buttons to filter by organization
    orgs.forEach(({ org_id, org_name }) => {
      $(`<button class="org-${org_id}">${org_name}</button>`)
        .appendTo($sidebar)
        .on('click', filterPasswords(`?type=org&id=${org_id}`));
    });
    $sidebar.append($('<hr />'));

    // Append buttons to filter by category
    categories.forEach(({ cat_id, category }) => {
      $(`<button class="cat-${cat_id}">${category}</button>`)
        .appendTo($sidebar)
        .on('click', filterPasswords(`?type=cat&id=${cat_id}`));
    });
  });

  //----------------------------------------------------------------------------
  // Return component

  return $sidebar;
};
