//------------------------------------------------------------------------------
// Create component for a single password
//------------------------------------------------------------------------------

const createPasswordCard = (password, views) => {
  const $article = $('<article class="password">')
    .append(
      $('<div class="logo"><img></div>'),
      $('<div class="site_name">').text(password.site_name),
      $('<div class="site_login">').text(password.site_login),
      $btnIcon('go-to', 'external-link-alt'),
      $('<div class="buttons">').append(
        $btnIcon('cp-login', 'user'),
        $btnIcon('cp-pwd', 'key'),
        $btnIcon('edit', 'edit'),
        $btnIcon('delete', 'trash')
      )
    )
    .addClass('password');

  //----------------------------------------------------------------------------
  // Set listeners and actions

  $article.find('.go-to').on('click', () => window.open(password.site_url));

  $article
    .find('.cp-login')
    .on('click', () => navigator.clipboard.writeText(password.site_login));

  $article
    .find('.cp-pwd')
    .on('click', () => navigator.clipboard.writeText(password.site_pwd));

  $article.find('.edit').on('click', () => {
    views.edit.pwd_id = password.id;
    views.setView('edit');
  });

  $article.find('.delete').on('click', () => {
    $.ajax({
      method: 'DELETE',
      url: `/api/passwords/${password.id}`,
    }).then(() => {
      views.menu.update();
      views.browse.update();
    });
  });

  //----------------------------------------------------------------------------
  // Return component

  return $article;
};
