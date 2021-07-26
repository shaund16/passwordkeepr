//------------------------------------------------------------------------------
// jQuery component for a side bar with filters
//------------------------------------------------------------------------------

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
      () => {
        state.sidebar_active = 'all-pwd';
        state.query = '';
        updatePasswordList(state);
      }
    );
    const $own = $('<button class="own-pwd">My passwords</button>').on(
      'click',
      () => {
        state.sidebar_active = 'own-pwd';
        state.query = '?type=own';
        updatePasswordList(state);
      }
    );

    $sidebar
      .empty()
      .append($add, $('<hr />'), $all, $own, $('<hr />'))
      .css({ border: '1px solid blue', margin: '1em' });

    // Append buttons to filter by organization
    orgs.forEach(({ org_id, org_name }) => {
      $(`<button class="org-${org_id}">${org_name}</button>`)
        .appendTo($sidebar)
        .on('click', () => {
          state.sidebar_active = `org-${org_id}`;
          state.query = `?type=org&id=${org_id}`;
          updatePasswordList(state);
        });
    });

    $sidebar.append($('<hr />'));

    // Append buttons to filter by category
    categories.forEach(({ cat_id, category }) => {
      $(`<button class="cat-${cat_id}">${category}</button>`)
        .appendTo($sidebar)
        .on('click', () => {
          state.sidebar_active = `cat-${cat_id}`;
          state.query = `?type=cat&id=${cat_id}`;
          updatePasswordList(state);
        });
    });
  });

  //----------------------------------------------------------------------------
  // Return component

  return $sidebar;
};
