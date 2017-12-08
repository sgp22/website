$(function () {

  const host = window.location.hostname;
  let port;
  
  const slug = $('.status-tag').attr('href');
  const button = $('<button>');
  
  if (host === 'localhost') {
    port = ':4200'
  }

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
    .attr('data-action', `http://${host}${port}${slug}preview`);

  $('.preview').append(button);

  button.on('click', function(e) {
    e.preventDefault();
    window.open( $(this).data('action') );
  });

});