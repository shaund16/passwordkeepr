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
        }).then((data) => {
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
        ({ orgs, categories, passwords }) => {
          //
          // Helper: Create label and input element
          const $input = (label, id, type, value) => [
            $(`<label for="${id}">${label}:</label>`),
            $('<br />'),
            $(`<input id="${id}" name="${id}" type="${type}">`).val(value),
            $('<br />'),
          ];

          // Dynamic field: Categories
          const $select_cat = $('<select id="category_id" name="category_id">');
          const $categories = [
            $('<label for="category_id">Category:</label>'),
            $('<br />'),
            $select_cat,
            $('<br />'),
          ];
          categories.forEach(({ cat_id, category }) => {
            const $option = $('<option>').attr('value', cat_id).text(category);
            $select_cat.append($option);
          });

          // Dynamic field: Organisations
          const $select_org = $('<select id="org_id" name="org_id">');
          const $orgs = [
            $('<label for="org_id">Organization:</label>'),
            $('<br />'),
            $select_org,
            $('<br />'),
          ];
          orgs.forEach(({ org_id, org_name }) => {
            const $option = $('<option>').attr('value', org_id).text(org_name);
            $select_org.append($option);
          });

          // Append
          const $form = this.component.find('form');
          $form
            .empty()
            .append(
              $input('Site name', 'site_name', 'text', passwords[0].site_name),
              $input('Site URL', 'site_url', 'text', passwords[0].site_url),
              $input('Login', 'site_login', 'text', passwords[0].site_login),
              $input('Password', 'site_pwd', 'text', passwords[0].site_pwd),
              $categories,
              $orgs,
              '<button class="submit" type="submit">Submit</button>',
              '<button class="reset" type="button">Reset</button>',
              '<button class="cancel" type="button">Cancel</button>'
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
