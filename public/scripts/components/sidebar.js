//------------------------------------------------------------------------------
// Create sidebar component to filter the list of passwords
//------------------------------------------------------------------------------

const createSidebar = (views, id) => {
  const view = {
    component: null,
    active: 'all-pwd',
    id,
    views,

    //--------------------------------------------------------------------------
    // Set the filter

    setFilter: function (cls, query) {
      return () => {
        this.views.setView('browse');
        this.active = cls;
        this.views.browse.query = query;
        this.views.browse.update();
      };
    },

    //--------------------------------------------------------------------------
    // Initialize

    init: function () {
      this.component = $(`<section>`).attr('id', id);
      return this;
    },

    //--------------------------------------------------------------------------
    // Update

    update: function () {
      // Ajax
      $.get('/api/users/filters').then(({ orgs, categories }) => {
        // Standard buttons
        const $add = $('<button class="add-pwd">Add password</button>').on(
          'click',
          () => {
            this.views.setView('add');
          }
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

  view.init().update();
  views[id] = view;
};
