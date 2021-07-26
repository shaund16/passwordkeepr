//------------------------------------------------------------------------------
// Create edit password form
//------------------------------------------------------------------------------

const createEditPassword = (views, id) => {
  views[id] = {
    component: $(`<section>`).attr('id', id),
    id,
    views,

    update: function () {
      this.component
        .text('EDIT')
        .css({ border: '1px solid black', margin: '1em' });
      return this.component;
    },
  };

  views[id].update();
};
