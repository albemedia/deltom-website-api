$('document').ready(() => {
  $('#selectedImageContainer').hide();
  $('select#imagePicker').imagepicker({
    selected: (select, options, event) => {
      $('#selectedImage').html(options.target.outerHTML);
      $('#selectedImageContainer').show();
    },
  });
});
