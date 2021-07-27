//------------------------------------------------------------------------------
// Create add new password form
//------------------------------------------------------------------------------

const createAddPassword = (views, id) => {
  const view = {
    component: null,
    genOptions: new Set(['lower', 'upper', 'digits']),
    genLength: 10,
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

          $btnIcon('gen btn-icon', 'button', 'angle-double-right'),
          $button('lower toggle', 'button', 'a'),
          $button('upper toggle', 'button', 'A'),
          $button('digits toggle', 'button', '0'),
          $button('symbols toggle', 'button', '#'),
          $button('punct toggle', 'button', '?'),
          $button('brackets toggle', 'button', '()'),
          $(
            `<input class="length" type="number" min="10" value="${this.genLength}">`
          ),

          $('<br />'),
          $categories,
          $orgs,

          $button('submit', 'submit', 'Submit'),
          $button('reset', 'reset', 'Reset'),
          $button('cancel', 'button', 'Cancel')
        );

        // Toggle generate options
        [...this.genOptions].forEach((option) => {
          $form.find(`.${option}`).addClass('on');
        });

        // Set length listener
        $form.find('.length').on('change', setGenLength(this));

        // Set toggle listeners
        $form.find('.toggle').on('click', setGenOptions(this));

        // Set generate listener
        $form.find('.gen').on('click', () => {
          $form
            .find('#add-pwd')
            .val(genPassword(this.genLength, this.genOptions));
        });

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
