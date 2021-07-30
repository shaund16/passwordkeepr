//------------------------------------------------------------------------------
// Create the browse passwords component
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Create a component to browse all passwords

const createBrowsePasswords = (views, id) => {
  const view = {
    component: null,
    query: '',
    id,
    views,

    //--------------------------------------------------------------------------
    // Initialize

    init: function () {
      this.component = $(`<section>`).attr('id', id);
      this.update();

      this.views[this.id] = this;
      this.views.append(id);
    },

    //--------------------------------------------------------------------------
    // Update

    update: function () {
      $.get(`/api/passwords${this.query}`).then(({ passwords, user_id }) => {
        this.component.empty();
        passwords.forEach((pwd) =>
          this.component.append(this.createPasswordCard(pwd, Number(user_id)))
        );
      });
    },

    //----------------------------------------------------------------------------
    // Create a component for a single password

    createPasswordCard: function (password, user_id) {
      // Get logo from clearbit API
      const query = `https://logo.clearbit.com/${password.site_url}?size=65&`;
      const $logo = $('<div class="logo">');
      const $img = $('<img>').attr('src', query).appendTo($logo);

      // Display initial if logo not found
      $img.on('error', () => {
        $img.detach();
        const initial = password.site_name[0].toUpperCase();
        $('<div class="def-img">').text(initial).appendTo($logo);
      });

      // Assemble component
      const $article = $('<article class="password">')
        .append(
          $logo,
          $('<div class="site_name">').text(password.site_name),
          $('<div class="site_login">').text(password.site_login),
          $btnIcon('go-to', 'external-link-alt'),
          $btnIcon('buttons cp-login', 'user'),
          $btnIcon('buttons cp-pwd', 'key'),
          $btnIcon('buttons edit', 'edit'),
          $btnIcon('buttons delete', 'trash')
        )
        .addClass('password');

      // Disable edit and delete if user not the owner
      if (password.creator_id !== user_id) {
        $article
          .find('.edit, .delete')
          .attr('disabled', 'disabled')
          .addClass('inactive');
      }

      //------------------------------------------------------------------------
      // Set listeners and actions

      $article.find('.go-to').on('click', () => window.open(password.site_url));

      $article
        .find('.cp-login')
        .on('click', () => navigator.clipboard.writeText(password.site_login));

      $article
        .find('.cp-pwd')
        .on('click', () => navigator.clipboard.writeText(password.site_pwd));

      $article.find('.edit').on('click', () => {
        this.views.edit.pwd_id = password.id;
        this.views.setView('edit');
      });

      $article.find('.delete').on('click', () => {
        $.ajax({
          method: 'DELETE',
          url: `/api/passwords/${password.id}`,
        }).then(() => {
          this.views.menu.update();
        });
      });

      return $article;
    },
  };

  view.init();
};
