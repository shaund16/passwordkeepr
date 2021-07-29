//------------------------------------------------------------------------------
// Main client side script
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Todo:
// - Logo API
// - Responsive cards
// - Responsive layout
// - Menu icons
// - Login
// - Register
// - Navbar login
// - Validate forms

//------------------------------------------------------------------------------
// Manage views for SPA

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

//------------------------------------------------------------------------------
// Create jQuery components when document is ready

$(() => {
  const views = createViews($('#body'));
  createNavbar(views, 'navbar');
  createMenu(views, 'menu');
  createBrowsePasswords(views, 'browse');
  createForm(views, 'edit', 'Edit a password');
  createForm(views, 'add', 'Create a new password');
  views.setView('browse');
});
