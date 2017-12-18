$(function () {

  const host = window.location.hostname;
  const slug = $('#id_slug').val();
  const num = /\d{1,10}/g;
  const id = window.location.pathname.match(num).toString();
  const button = $('<button>');
  const unpublishBtn = $("footer ul a:contains('Unpublish')");

  /*
    Remove default preview button
  */
  $('.action-preview').remove();

  /*
    Create our button
  */
  button
    .addClass('button icon icon-view')
    .text('Preview')
    .attr('data-action', `http://${host}/${slug}?preview=true&id=${id}`);

  if (unpublishBtn.length) {

    $('.preview').append(button);

    button.on('click', function(e) {
      e.preventDefault();
      window.open( $(this).data('action') );
    });

  }

});
