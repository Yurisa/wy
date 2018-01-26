window.onload = function(){
	//轮播图
	$('.carousel').carousel();
	var oBanner = document.getElementById("banner");
	oBanner.onmousedown = function(e){
		var oEvent = e ||event;
		var iMouseX = parseInt(oEvent.clientX);
		document.onmousemove = function(e){
			var oEvent2 = e ||event;
			var iMouseX2 = parseInt(oEvent2.clientX);
			if(iMouseX2 - iMouseX >10){
				$('.carousel').carousel('prev');
				document.onmousemove= null;
			}else if(iMouseX - iMouseX2 >10){
				$('.carousel').carousel('next');
				document.onmousemove= null;
			}
			
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	}
	//手机滑动
	$("#banner").on("swipeleft",function(){
  		$('.carousel').carousel('next');
	});
	$("#banner").on("swiperight",function(){
  		$('.carousel').carousel('prev');
	});
	//搜索提交
	
	$(".search-btn").click(function(){
		document.getElementById("search-submit").click();
	});
	

};
