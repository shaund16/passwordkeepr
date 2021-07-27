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
        const $categories = $select(
          'Category:',
          'add-category-id',
          'category_id',
          categories,
          'cat_id',
          'category'
        );

        // Dynamic field: Organizations
        const $orgs = $select(
          'Organization:',
          'add-org-id',
          'org_id',
          orgs,
          'org_id',
          'org_name'
        );

        // Append
        const $form = this.component.find('form');
        $form.empty();
        $form.append(
          $input('Site name', 'add-name', 'site_name', 'text'),
          $input('Site URL', 'add-url', 'site_url', 'text'),
          $input('Login', 'add-login', 'site_login', 'text'),
          $input('Password', 'add-pwd', 'site_pwd', 'text'),
          $categories,
          $orgs,
          $button('submit', 'submit', 'Submit'),
          $button('cancel', 'button', 'Cancel')
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
