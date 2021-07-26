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
      this.component = $(`<nav>`)
        .attr('id', id)
        .text('NAVIGATION')
        .css({ border: '1px solid black', margin: '1em' });
      return this;
    },

    //--------------------------------------------------------------------------
    // Update

    update: function () {
      return this;
    },
  };

  view.init().update();
  views[id] = view;
};
