//------------------------------------------------------------------------------
// Main client side script
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Todo:
// - Search function
// - Logo API
// - Responsive cards
// - Responsive layout
// - Menu icons
// - Login
// - Register
// - Navbar login
// - Pwd cards: Buttons inactive if not owner

const createViews = (parent) => ({
  parent,
  current: null,

  append: function (...views) {
    const comps = views.map((view) => this[view].component);
    this.parent.append(comps);
  },

  setView: function (view) {
    const newComp = this[view].component;
    if (newComp === this.current) return;
    if (this.current) this.current.detach();
    this.current = newComp;
    this[view].update();
    this.parent.append(this.current);
  },
});

$(() => {
  const views = createViews($('#body'));
  createNavbar(views, 'navbar');
  createMenu(views, 'menu');
  createBrowsePasswords(views, 'browse');
  createForm(views, 'edit', 'Edit a password');
  createForm(views, 'add', 'Create a new password');
  views.setView('browse');
  views.setView('edit');
});
