$(function () {

  const host = window.location.hostname;
  const slug = $('.status-tag').attr('href');
  const num = /\d{1,10}/g;
  const id = window.location.pathname.match(num).toString();
  const button = $('<button>');

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

  $('.preview').append(button);

  button.on('click', function(e) {
    e.preventDefault();
    window.open( $(this).data('action') );
  });

});
