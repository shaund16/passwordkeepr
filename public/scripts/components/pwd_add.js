//------------------------------------------------------------------------------
// Create add new password form
//------------------------------------------------------------------------------

const createAddPassword = (views, id) => {
  views[id] = {
    component: $(`<section>`).attr('id', id),
    id,
    views,

    update: function () {
      this.component
        .text('ADD')
        .css({ border: '1px solid black', margin: '1em' });
      return this.component;
    },
  };

  views[id].update();
};
