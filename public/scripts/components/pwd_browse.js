//------------------------------------------------------------------------------
// Create browse passwords component
//------------------------------------------------------------------------------

const createBrowsePasswords = (state, id) => {
  state.browse = {
    component: $(`<section>`).attr('id', id),
    query: '',
    id,
    state,

    update: function () {
      $.get(`/api/passwords${this.query}`).then(({ passwords }) => {
        this.component.empty();
        passwords.forEach((pwd) =>
          this.component.append(createPasswordCard(pwd, this.state))
        );
      });
      return this.component;
    },
  };
};
