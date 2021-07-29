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
          <div class="user">
            <div>rfripp</div>
            <button class="logout" type="button">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>`)
      );

      // Set search listener
      const $input = $nav.find('input');
      $nav.find('.search').on('submit', (event) => {
        event.preventDefault();
        const query = '?type=search&' + $('.search').serialize();
        this.views.setView('browse');
        this.views.browse.query = query;
        this.views.browse.update();
        $input.val('').blur();
      });

      return this;
    },

    //--------------------------------------------------------------------------
    // Update

    update: function () {
      return this;
    },
  };

  view.init();
};
