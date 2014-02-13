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

$( "#add-detail-btn" ).click(function() 
{
  $("#gen-code").append('<div class="item"><div class="input-group"><input type="text" class="detail-summary form-control" placeholder="Question"><span class="input-group-btn"><button class="btn btn-danger remove-detail" type="button"><span class="glyphicon glyphicon-trash"></span> Remove</button></span></div><div class="form-group" style="margin-top:10px;"><textarea class="detail-content form-control" placeholder="Content"></textarea></div></div>');

  	tinymce.init(tinymceOpts);
});

$(document.body).on('click', '.remove-detail', function()
{
	$( this ).parent().parent().parent('.item').remove();
});

$( "#gen-code-btn" ).click(function() 
{
	var genCode = '';

	$( "#gen-code div.item" ).each(function( index, element ) {
		// element == this
		var summary = $('.detail-summary', this ).val();
		var content = $('.detail-content', this ).val();

		if(summary.length == 0 || content.length == 0) return false;

		genCode += '<details>' + "\r\n"
				+ '<summary>'+summary+'</summary>' + "\r\n"
				+ content + "\r\n"
				+ '</details>' + "\r\n" + "\r\n";
	});

	var pretext = $('.cat_pretext').val();
	var posttext = $('.cat_posttext').val();

	if(pretext.length > 0) 
	{
		genCode = '<div class="cat_summary">'  + "\r\n\r\n" + pretext + "\r\n\r\n" + genCode;

		if(posttext.length > 0)
			genCode = genCode + '<p>&nbsp;</p>' + "\r\n" + posttext + "\r\n\r\n" + '</div>';
		else
			genCode = genCode + "\r\n" + '</div>';
	}

	$('#output-gen-code').text(genCode);
});