var EcommerceProductsEdit = function() {
		var e = function() {
				var e = new plupload.Uploader({
					runtimes: "html5,flash,silverlight,html4",
					browse_button: document.getElementById("tab_images_uploader_pickfiles"),
					container: document.getElementById("tab_images_uploader_container"),
					url: "?c=index&a=uploadImg&width=800",
					filters: {
						max_file_size: "10mb",
						mime_types: [{
							title: "Image files",
							extensions: "jpg,gif,png"
						}, {
							title: "Zip files",
							extensions: "zip"
						}]
					},
					flash_swf_url: "../plugins/plupload/js/Moxie.swf",
					silverlight_xap_url: "../plugins/plupload/js/Moxie.xap",
					init: {
						PostInit: function() {
							$("#tab_images_uploader_filelist").html(""), $("#tab_images_uploader_uploadfiles").click(function() {
								return e.start(), !1
							}), $("#tab_images_uploader_filelist").on("click", ".added-files .remove", function() {
								e.removeFile($(this).parent(".added-files").attr("id")), $(this).parent(".added-files").remove()
							})
						},
						FilesAdded: function(e, a) {
							plupload.each(a, function(e) {
								$("#tab_images_uploader_filelist").append('<div class="alert alert-warning added-files" id="uploaded_file_' + e.id + '">' + e.name + "(" + plupload.formatSize(e.size) + ') <span class="status label label-info"></span>&nbsp;<a href="javascript:;" style="margin-top:-5px" class="remove pull-right btn btn-sm red"><i class="fa fa-times"></i> remove</a></div>')
							})
						},
						UploadProgress: function(e, a) {
							$("#uploaded_file_" + a.id + " > .status").html(a.percent + "%")
						},
						FileUploaded: function(e, a, t) {
							var t = $.parseJSON(t.response);
							if (t.result && "ok" == t.result) {
								t.body.id;
								$("#uploaded_file_" + a.id + " > .status").removeClass("label-info").addClass("label-success").html('<input type="hidden" name="newimg[]" value="'+t.body.id+'"><i class="fa fa-check"></i> Done')
							} else $("#uploaded_file_" + a.id + " > .status").removeClass("label-info").addClass("label-danger").html('<i class="fa fa-warning"></i> Failed'), App.alert({
								type: "danger",
								message: "One of uploads failed. Please retry.",
								closeInSeconds: 10,
								icon: "warning"
							})
						},
						Error: function(e, a) {
							App.alert({
								type: "danger",
								message: a.message,
								closeInSeconds: 10,
								icon: "warning"
							})
						}
					}
				});
				e.init()
			};
		return {
			init: function() {
				 e();
			}
		}
	}();
var UIBootbox = function() {
    var o = function() {    
        $(".remove-img").click(function() {
			var id = $(this).attr('data-id');
			var remover_tr = $(this).parent('td').parent('tr');
			//alert(remover_img.re);
            bootbox.confirm("你确定要进行移除操作吗?",
            function(o) {
                if(o){
					$.post('?c=admin&a=scenic_img_delete','id='+id,function(msg){
						if(msg.code==0){
							remover_tr.remove();
						}else{
							App.alert({
								type: "danger",
								message: msg.result,
								closeInSeconds: 10,
								icon: "warning"
							})
						}
					},'json');	

				}
            });
        });
    },
	p = function() {    
        $(".remove-slide").click(function() {
			var id = $(this).attr('data-id');
			var remover_tr = $(this).parent('td').parent('tr');
			//alert(remover_img.re);
            bootbox.confirm("你确定要进行移除操作吗?",
            function(o) {
                if(o){
					$.post('?c=admin&a=slide_delete','id='+id,function(msg){
						if(msg.code==0){
							remover_tr.remove();
						}else{
							App.alert({
								type: "danger",
								message: msg.result,
								closeInSeconds: 10,
								icon: "warning"
							})
						}
					},'json');	

				}
            });
        });
    };
    return {
        init: function() {
            o();
			p();
        }
    }
} ();

	
jQuery(document).ready(function() {
	EcommerceProductsEdit.init();
	UIBootbox.init()
	 $(".image_main").click(function(){
	  	$('.image_main').not($(this)).attr('checked',false);
	 });

});
