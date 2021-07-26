//------------------------------------------------------------------------------
// Create component for a single password
//------------------------------------------------------------------------------

const createPasswordCard = (password, views) => {
  const $article = $('<article class="password">')
    .append(
      $('<div class="site_name">').text(password.site_name),
      $('<div class="site_url">').text(password.site_url),
      $('<div class="site_login">').text(password.site_login),
      $('<div>').append(
        $('<button class="button go-to">Go to URL</button>'),
        $('<button class="button cp-login">Copy login</button>'),
        $('<button class="button cp-pwd">Copy password</button>'),
        $('<button class="button edit">Edit</button>'),
        $('<button class="button delete">Delete</button>')
      )
    )
    .addClass('password')
    .css({ border: '1px solid black', margin: '1em' });

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
    views.setView('edit');
  });

  $article.find('.delete').on('click', () => {
    $.ajax({
      method: 'DELETE',
      url: `/api/passwords/${password.id}`,
    }).then(() => {
      views.sidebar.update();
      views.browse.update();
    });
  });

  //----------------------------------------------------------------------------
  // Return component

  return $article;
};
