//------------------------------------------------------------------------------
// jQuery component for a side bar with filters
//------------------------------------------------------------------------------

const setFilter = (cls, query, state) => () => {
  state.sidebar_active = cls;
  state.query = query;
  updatePasswordList(state);
};

const createSideBar = () => $('<section id="side">');

const updateSideBar = (state) => {
  const $sidebar = state.sidebar;

  // Ajax
  $.get('/api/users/filters').then(function ({ orgs, categories }) {
    // Standard buttons
    const $add = $('<button class="add-pwd">Add password</button>').on(
      'click',
      () => {}
    );

    const $all = $('<button class="all-pwd">All password</button>').on(
      'click',
      setFilter('all-pwd', '', state)
    );

    const $own = $('<button class="own-pwd">My passwords</button>').on(
      'click',
      setFilter('own-pwd', '?type=own', state)
    );

    $sidebar
      .empty()
      .append($add, $('<hr />'), $all, $own, $('<hr />'))
      .css({ border: '1px solid blue', margin: '1em' });

    // Append buttons to filter by organization
    orgs.forEach(({ org_id, org_name }) => {
      const cls = `org-${org_id}`;
      $(`<button class="${cls}">${org_name}</button>`)
        .appendTo($sidebar)
        .on('click', setFilter(cls, `?type=org&id=${org_id}`, state));
    });

    $sidebar.append($('<hr />'));

    // Append buttons to filter by category
    categories.forEach(({ cat_id, category }) => {
      const cls = `cat-${cat_id}`;
      $(`<button class="${cls}">${category}</button>`)
        .appendTo($sidebar)
        .on('click', setFilter(cls, `?type=cat&id=${cat_id}`, state));
    });
  });

  //----------------------------------------------------------------------------
  // Return component

  return $sidebar;
};
