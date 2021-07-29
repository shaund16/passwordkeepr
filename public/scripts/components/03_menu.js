//------------------------------------------------------------------------------
// Create the menu component to filter the list of passwords
//------------------------------------------------------------------------------

const createMenu = (views, id) => {
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
      this.update();

      this.views[this.id] = this;
      this.views.append(id);

      return this;
    },

    //--------------------------------------------------------------------------
    // Update

    update: function () {
      // Ajax
      $.get('/api/users/filters').then(({ orgs, categories }) => {
        // Standard buttons
        const $add = $btnIconText('add-pwd', 'plus', 'Add password');
        $add.on('click', () => this.views.setView('add'));

        const $all = $btnIconText('all-pwd', 'home', 'All passwords');
        $all.on('click', this.setFilter('all-pwd', ''));

        const $own = $btnIconText('own-pwd', 'user', 'Own passwords');
        $own.on('click', this.setFilter('own-pwd', '?type=own'));

        this.component
          .empty()
          .append(
            $add,
            $('<div class="hr">'),
            $all,
            $own,
            $('<div class="hr">')
          );

        // Append buttons to filter by organization
        orgs.forEach(({ org_id, org_name }) => {
          const cls = `org-${org_id}`;
          const $button = $btnIconText(cls, '', org_name);
          $button
            .appendTo(this.component)
            .on('click', this.setFilter(cls, `?type=org&val=${org_id}`));
        });

        this.component.append($($('<div class="hr">')));

        // Append buttons to filter by category
        categories.forEach(({ cat_id, category }) => {
          const cls = `cat-${cat_id}`;
          const $button = $btnIconText(cls, '', category);
          $button
            .appendTo(this.component)
            .on('click', this.setFilter(cls, `?type=cat&val=${cat_id}`));
        });
      });

      return this.component;
    },
  };

  view.init();
};
