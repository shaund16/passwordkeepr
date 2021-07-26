//------------------------------------------------------------------------------
// Create navigation bar
//------------------------------------------------------------------------------

const createNavbar = (views, id) => {
  views[id] = {
    component: $(`<nav>`).attr('id', id),
    id,
    views,

    update: function () {
      this.component
        .text('NAVIGATION')
        .css({ border: '1px solid black', margin: '1em' });
      return this.component;
    },
  };

  views[id].update();
};
