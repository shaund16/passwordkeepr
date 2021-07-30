//------------------------------------------------------------------------------
// Create the navigation bar component
//------------------------------------------------------------------------------

const createNavbar = (views, id) => {
  const view = {
    component: null,
    id,
    views,

    //--------------------------------------------------------------------------
    // Initialize

    init: function () {
      const $nav = $('<nav>').attr('id', id);
      this.component = $nav;
      this.views[this.id] = this;
      this.views.append(id);

      $nav.append(
        $(`<div class="logo">
            <i class="fas fa-lock"></i>
            <div>PassKeepR</div>
          </div>
            <form class="search">
              <i class="fas fa-search"></i>
              <input type="text" name="val" placeholder="Search passwords">
            </form>
          <div class="user"></div>`)
      );

      this.update();

      // Set search listener
      const $search = $nav.find('input');
      $nav.find('.search').on('submit', (event) => {
        event.preventDefault();
        const query = '?type=search&' + $('.search').serialize();
        this.views.setView('browse');
        this.views.browse.query = query;
        this.views.menu.setActive('search');
        this.views.browse.update();
        $search.val('').blur();
      });
    },

    //--------------------------------------------------------------------------
    // Update

    update: function () {
      $.get('/api/users/me').then(({ user }) => {
        const $user = this.component.find('.user');
        $user.append(
          $(`<div>${user[0].name}</div>`),
          $('<button class="logout" type="button">').append(
            '<i class="fas fa-sign-out-alt">'
          )
        );
      });
    },
  };

  view.init();
};
