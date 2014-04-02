var tinymceOpts = {
	selector:'textarea',
	plugins: ["advlist lists paste"],
    toolbar1: "removeformat | undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | link unlink | forecolor backcolor",
    menubar: false,
    toolbar_items_size: 'small',
	setup : function(editor) {
		editor.on('keyup', function(e) {
            tinymce.triggerSave();
        });
   }
};

$( document ).ready(function() {
    tinymce.init(tinymceOpts);	
});

$( "#add-bc-btn" ).click(function() 
{
  $("#breadcrumbs").append('<div class="item"><div class="input-group"><input type="text" class="bc-text form-control" placeholder="Text"><span class="input-group-btn"><button class="btn btn-danger remove-bc" type="button"><span class="glyphicon glyphicon-trash"></span> Remove</button></span></div><div class="form-group" style="margin-top:10px;"><input type="text" class="bc-link form-control" placeholder="Link"></div></div>');

  	tinymce.init(tinymceOpts);
});

$(document.body).on('click', '.remove-bc', function()
{
	$( this ).parent().parent().parent('.item').remove();
});

$( "#gen-code-btn" ).click(function() 
{
	var breadcrumbs = '<div class="breadcrumbs">' + "\r\n" + '<ul>' + "\r\n" + '<li class="homelink"><a href="http://www.no1fitness.co.nz/" class="home_icon">Home</a></li>' + "\r\n";

	$( "#breadcrumbs div.item" ).each(function( index, element ) {
		// element == this
		var bcText = $('.bc-text', this ).val();
		var bcLink = $('.bc-link', this ).val();

		if(bcText.length == 0) return false;

		breadcrumbs += '<li>';

		if(bcLink.length == 0)
		{
			breadcrumbs += '<b>' + bcText + '</b>';
		}
		else
		{
			breadcrumbs += '<a href="'+ bcLink +'">' + bcText + '</a>';
		}

		breadcrumbs += '</li>' + "\r\n";
	});

	breadcrumbs += '</ul>' + "\r\n" + '</div>' + "\r\n";

	var content = $('.info-content').val();

	var genCode = breadcrumbs + '<div class="cus-content">' + content + '</div>' + "\r\n" + '<style><!--.content:first-child h1 {position: absolute;top: 71px;left: 25px;}.content .breadcrumbs {margin-bottom: 41px;} .content.secondary {margin-top:71px;}--></style>';

	$('#output-gen-code').text(genCode);
});