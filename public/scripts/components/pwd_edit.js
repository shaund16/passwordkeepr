//------------------------------------------------------------------------------
// Create edit password form
//------------------------------------------------------------------------------

const createEditPassword = (views, id) => {
  const view = {
    component: null,
    pwd_id: -1,
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

      const $form = $('<form>')
        .attr('id', 'edit-form')
        .appendTo(this.component);

      // Set submit listener
      $form.on('submit', (event) => {
        event.preventDefault();

        // Put form data to server
        $.ajax({
          method: 'PUT',
          url: `/api/passwords/${this.pwd_id}`,
          data: $('#edit-form').serialize(),
        }).then(() => {
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
      $.get(`/api/users/filters?id=${this.pwd_id}`).then(
        ({ orgs, categories, passwords: [password] }) => {
          // Dynamic field: Categories
          const $categories = $select(
            'Category:',
            'edit-category-id',
            'category_id',
            categories,
            'cat_id',
            'category'
          );

          // Dynamic field: Organizations
          const $orgs = $select(
            'Organization:',
            'edit-org-id',
            'org_id',
            orgs,
            'org_id',
            'org_name'
          );

          // Append
          const $form = this.component.find('form');
          $form.empty();
          $form.append(
            $input('Site name', 'edit-name', 'site_name', 'text', password),
            $input('Site URL', 'edit-url', 'site_url', 'text', password),
            $input('Login', 'edit-login', 'site_login', 'text', password),
            $input('Password', 'edit-pwd', 'site_pwd', 'text', password),
            $categories,
            $orgs,
            $button('submit', 'submit', 'Submit'),
            $button('reset', 'button', 'Reset'),
            $button('cancel', 'button', 'Cancel')
          );

          // Set cancel listener
          $form.find('.cancel').on('click', () => {
            this.clear();
            this.views.setView('browse');
          });
        }
      );

      return this;
    },
  };

  view.init();
  views[id] = view;
};
