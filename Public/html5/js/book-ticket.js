$(document).ready(function(e) {
	$(".menpiao").each(function(n){
		$(this).click(function(){
			console.log(n);
			$(this).children(".xiangshang").toggleClass("xiangxia");
			$(".menpiao-content").eq(n).fadeToggle(300);	

		});
	})
});