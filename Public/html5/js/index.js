window.onload = function(){
	//�ֲ�ͼ
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
	//�ֻ�����
	$("#banner").on("swipeleft",function(){
  		$('.carousel').carousel('next');
	});
	$("#banner").on("swiperight",function(){
  		$('.carousel').carousel('prev');
	});
	//�����ύ
	
	$(".search-btn").click(function(){
		document.getElementById("search-submit").click();
	});
	

};
