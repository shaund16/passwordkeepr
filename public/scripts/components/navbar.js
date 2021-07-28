//------------------------------------------------------------------------------
// Create navigation bar
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
        $(`
<div class="logo">
  <i class="fas fa-lock"></i>
  <div>PassKeepR</div>
</div>
<div class="search">
  <i class="fas fa-search"></i>
  <input type="text" placeholder="Search passwords">
</div>
<div class="user">
  <div>rfripp</div>
  <button class="logout" type="button">
    <i class="fas fa-sign-out-alt"></i>
  </button>
</div>
      `)
      );

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
