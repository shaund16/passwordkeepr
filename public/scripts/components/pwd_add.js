//------------------------------------------------------------------------------
// Create add new password form
//------------------------------------------------------------------------------

const createAddPassword = (views, id) => {
  const view = {
    component: null,
    id,
    views,

    //--------------------------------------------------------------------------
    // Clear

    clear: function () {
      this.component.find('input').val('');
      return this;
    },

    //--------------------------------------------------------------------------
    // Initialize

    init: function () {
      this.component = $('<section>')
        .attr('id', id)
        .css({ border: '1px solid black', margin: '1em' });

      const $form = $('<form>').attr('id', 'add-form').appendTo(this.component);

      // Set submit listener
      $form.on('submit', (event) => {
        event.preventDefault();

        // Post form data to server
        $.post('/api/passwords', $('#add-form').serialize()).then((data) => {
          this.clear();
          this.views.sidebar.update();
          this.views.browse.update();
          this.views.setView('browse');
        });
      });

      return this;
    },

    //--------------------------------------------------------------------------
    // Update

    update: function () {
      // Ajax
      $.get('/api/users/filters').then(({ orgs, categories }) => {
        // Dynamic field: Categories
        const $categories = $('<select id="category_id" name="category_id">');
        categories.forEach(({ cat_id, category }) => {
          const $option = $('<option>').attr('value', cat_id).text(category);
          $categories.append($option);
        });

        // Dynamic field: Organisations
        const $orgs = $('<select id="org_id" name="org_id">');
        orgs.forEach(({ org_id, org_name }) => {
          const $option = $('<option>').attr('value', org_id).text(org_name);
          $orgs.append($option);
        });

        // Append
        const $form = this.component.find('form');
        $form
          .empty()
          .append(
            '<label for="site_name">Site name:</label><br>',
            '<input id="site_name" name="site_name" type="text" value=""><br>',
            '<label for="site_url">Site URL:</label><br>',
            '<input id="site_url" name="site_url" type="text" value=""><br>',
            '<label for="site_login">Username:</label><br>',
            '<input id="site_login" name="site_login" type="text" value=""><br>',
            '<label for="site_pwd">Password:</label><br>',
            '<input id="site_pwd" name="site_pwd" type="text" value=""><br>',
            '<label for="category_id">Category:</label><br>',
            $categories,
            '<br><label for="org_id">Organization:</label><br>',
            $orgs,
            '<br><button class="submit" type="submit">Submit</button>',
            '<button class="cancel" type="button">Cancel</button>'
          );

        // Set cancel listener
        $form.find('.cancel').on('click', () => {
          this.clear();
          this.views.setView('browse');
        });
      });

      return this;
    },
  };

  view.init().update();
  views[id] = view;
};
