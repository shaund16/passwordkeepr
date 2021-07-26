//------------------------------------------------------------------------------
// Create sidebar component to filter the list of passwords
//------------------------------------------------------------------------------

const createSidebar = (state, id) => {
  state.sidebar = {
    component: $(`<section>`).attr('id', id),
    active: 'all-pwd',
    id,
    state,

    setFilter: function (cls, query) {
      return () => {
        this.active = cls;
        this.state.browse.query = query;
        this.state.browse.update();
      };
    },

    update: function () {
      // Ajax
      $.get('/api/users/filters').then(({ orgs, categories }) => {
        // Standard buttons
        const $add = $('<button class="add-pwd">Add password</button>').on(
          'click',
          () => {}
        );

        const $all = $('<button class="all-pwd">All password</button>').on(
          'click',
          this.setFilter('all-pwd', '')
        );

        const $own = $('<button class="own-pwd">My passwords</button>').on(
          'click',
          this.setFilter('own-pwd', '?type=own')
        );

        this.component
          .empty()
          .append($add, $('<hr />'), $all, $own, $('<hr />'))
          .css({ border: '1px solid blue', margin: '1em' });

        // Append buttons to filter by organization
        orgs.forEach(({ org_id, org_name }) => {
          const cls = `org-${org_id}`;
          $(`<button class="${cls}">${org_name}</button>`)
            .appendTo(this.component)
            .on('click', this.setFilter(cls, `?type=org&id=${org_id}`));
        });

        this.component.append($('<hr />'));

        // Append buttons to filter by category
        categories.forEach(({ cat_id, category }) => {
          const cls = `cat-${cat_id}`;
          $(`<button class="${cls}">${category}</button>`)
            .appendTo(this.component)
            .on('click', this.setFilter(cls, `?type=cat&id=${cat_id}`));
        });
      });

      return this.component;
    },
  };
};
