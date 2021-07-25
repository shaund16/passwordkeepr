//------------------------------------------------------------------------------
// jQuery component for a side bar with filters
//------------------------------------------------------------------------------

const createSideBar = () => $('<section id="side">');

const updateSideBar = ($sidebar) => {
  $sidebar
    .empty()
    .append(
      $('<button class="add-pwd">Add password</button>'),
      $('<hr />'),
      $('<button class="all-pwd">All passwords</button>'),
      $('<button class="own-pwd">My passwords</button>'),
      $('<hr />')
    )
    .css({ border: '1px solid blue', margin: '1em' });

  // Get user specific filters from server
  $.get('/api/users/filters').then((json) => {
    // Append buttons to filter by organization
    json.orgs.forEach(({ org_id, org_name }) => {
      const $org = $(`<button class="org-${org_id}">${org_name}</button>`);
      $sidebar.append($org);
    });
    $sidebar.append($('<hr />'));

    // Append buttons to filter by category
    json.categories.forEach(({ cat_id, category }) => {
      const $category = $(`<button class="cat-${cat_id}">${category}</button>`);
      $sidebar.append($category);
    });
  });

  // Set up event listener
  $sidebar.on('click', (event) => {
    const [type, id] = $(event.target).attr('class').split('-');

    if (type === 'add') {
      // switch to add
      return;
    }

    $.get(`/api/passwords?${type}=${id}`).then((json) => {
      console.log(json);
      updatePasswordList($components);
    });
  });

  //----------------------------------------------------------------------------
  // Return component

  return $sidebar;
};
