//------------------------------------------------------------------------------
// Create add new password form
//------------------------------------------------------------------------------

const createAddPassword = (views, id) => {
  views[id] = {
    component: $(`<section>`).attr('id', id),
    id,
    views,

    clear: function () {
      console.log('RETURN');
    },

    update: function () {
      this.component
        .append(
          $(`
      <form id="add-form">
        <label for="site_name">Site name:</label><br>
        <input id="site_name" name="site_name" type="text" value="alpha"><br>

        <label for="site_url">Site URL:</label><br>
        <input id="site_url" name="site_url" type="text" value="beta"><br>

        <label for="site_login">Username:</label><br>
        <input id="site_login" name="site_login" type="text" value="anon"><br>

        <label for="site_pwd">Password:</label><br>
        <input id="site_pwd" name="site_pwd" type="text" value="pwd"><br>

        <label for="category_id">Category:</label><br>
        <input id="category_id" name="category_id" type="text" value="1"><br>

        <label for="org_id">Organization:</label><br>
        <input id="org_id" name="org_id" type="text" value="1"><br>
        
        <button class="submit" type="submit">Submit</button>
      </form>
      `)
        )
        .css({ border: '1px solid black', margin: '1em' });

      this.component.find('#add-form').on('submit', function (event) {
        event.preventDefault();
        $.post('/api/passwords', $(this).serialize()).then(() => {
          console.log(this.id);
        });
      });

      return this.component;
    },
  };

  views[id].update();
};
