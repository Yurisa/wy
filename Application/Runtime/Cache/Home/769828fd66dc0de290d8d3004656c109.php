<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微语</title>
	<meta name="viewport" content="width = device-width, user-scalable = no, initial-scale = 1">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/weui.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/btn-style.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-detail.css">
	<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
	<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
</head>
<script>
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: 'wxbd6ba2d898068938', // 必填，公众号的唯一标识
		    timestamp: '<?php echo ($timestamp); ?>', // 必填，生成签名的时间戳
		    nonceStr: '<?php echo ($noncestr); ?>', // 必填，生成签名的随机串
		    signature:'<?php echo ($signature); ?>',// 必填，签名，见附录1
		    jsApiList: [
		    'onMenuShareTimeline',
		    'onMenuShareAppMessage',
		    'chooseImage',
		    'previewImage',
		    'uploadImage',
		    'downloadImage',
		    ]// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function(){
		  
		   wx.onMenuShareTimeline({
		    title: 'test1', // 分享标题
		    link: 'http://www.imooc.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494153540176&di=cb366cb3e33b303c6e58b221524e3b93&imgtype=0&src=http%3A%2F%2Ffile101.mafengwo.net%2Fs6%2FM00%2FEF%2F01%2FwKgB4lYu9JeABK-JABNCl3o-wIQ67.jpeg', // 分享图标
		    success: function () { 
		        // 用户确认分享后执行的回调函数
		    },
		    cancel: function () { 
		        // 用户取消分享后执行的回调函数
		    }
            });

		   wx.onMenuShareAppMessage({
			    title: 'test2', // 分享标题
			    desc: 'llalalal', // 分享描述
			    link: 'http://www.imooc.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			    imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494153540176&di=cb366cb3e33b303c6e58b221524e3b93&imgtype=0&src=http%3A%2F%2Ffile101.mafengwo.net%2Fs6%2FM00%2FEF%2F01%2FwKgB4lYu9JeABK-JABNCl3o-wIQ67.jpeg', // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});

		});
var getweek = theWeek()-getWeekNumber(2017,02,19)+1;
var c_id = parseInt("<?php echo ($c_id); ?>");
var nowweek = parseInt("<?php echo ($nowweek); ?>");
// alert(getweek);
      function show(){
          if (getweek!=nowweek) {
          	alert("不是当前周");
          }else{
		   wx.chooseImage({
			    count: 1, // 默认9
			    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
			    success: function (res) {
			        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			         if (localIds.length == 0) {
			        alert('请先使用 chooseImage 接口选择图片');
			        return;
				    }
				    // alert(1);
				    for(var k in localIds){
				        var localId = localIds[k];
		
				        wx.uploadImage({
				            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				            isShowProgressTips: 1, // 默认为1，显示进度提示
				            success: function (res) {
				            var serverId = res.serverId;
				            // $("#serverid").val(serverId); // 返回图片的服务器端ID
                                $.ajax({
                                    type:"POST",
                                    url:"http://php.shuochuang.net/hdd/index.php?c=Index&a=downFile",
                                    data:{
                                    	c_id:c_id,
                                    	nowweek:nowweek,
                                    	serverid:serverId,
                                    },
                                    dataType:"json",

                                   
                                });
                                
                                  alert("上传成功");
                                    

				            },
				            complete :function(){
				            	// alert(1);
				            }
				        });    	
				    }
							    }
							});
		}
						}
		wx.error(function(res){
		    
		});

    function onImageDone(){
    if (localIds.length == 0) {
        alert('请先使用 chooseImage 接口选择图片');
        return;
    }
    alert(1);
    for(var k in localIds){
        var localId = localIds[k];
 
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
               images.serverId.push(res.serverId);
               var sI =  images.serverId;
    //                      var serverId = res.serverId; // 返回图片的服务器端ID
                alert(sI);
               document.getElementById('img1').src=sI;
			   document.getElementById('imgsrc').value=sI;
            },
            complete :function(){
            	alert(1);
            }
        });    	
    }	
       }

 /**
   * 判断年份是否为润年
   *
   * @param {Number} year
   */
 function isLeapYear(year) {
     return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
 }
  /**
  * 获取某一年份的某一月份的天数
  *
  * @param {Number} year
  * @param {Number} month
  */
 function getMonthDays(year, month) {
     return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
 }
  function theWeek() {
    var totalDays = 0;
    now = new Date();
    years = now.getYear()
    if (years < 1000)
        years += 1900
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;
     
    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }
 
    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();
    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    //得到第几周
    var week = Math.round(totalDays / 7);
    return week;
}


function getWeekNumber(y, m, d) {
     var now = new Date(y, m - 1, d),
         year = now.getFullYear(),
         month = now.getMonth(),
         days = now.getDate();
     //那一天是那一年中的第多少天
     for (var i = 0; i < month; i++) {
         days += getMonthDays(year, i);
     }
 
     //那一年第一天是星期几
     var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
 
     var week = null;
     if (yearFirstDay == 1) {
         week = Math.ceil(days / yearFirstDay);
     } else {
         days -= (7 - yearFirstDay + 1);
         week = Math.ceil(days / 7) + 1;
     }
 
     return week;
 }
	</script>

<body>
	<div class="container">
		<div class="top">
			<div class="left"><a href=""><img src="/hdd/Public/weixin/images/back.png" id="backIcon" onclick="goback()"></a></div> <!--返回按钮-->
			<div class="title">课程详情</div>
			<div class="right"></div>			
		</div>
		<div class="hold"></div>
		<div class="box theDetailArea">
			<div class="area">
				<div class="box className"><p id="className"><?php echo ($name); ?></p>	<!--课程名-->
				<div class="box theInputArea">
					<input type="button" class="btn btn-primary" id="checkBtn" name="checkBtn" value="查看通知" onclick="checknotice()"><!--查看通知按钮-->
					<input type="button" class="btn btn-primary" id="DS-SignBtn" name="Detail-SignBtn" value="签到" onclick="show()"><!--签到按钮-->
				</div>
				</div>
				<div class="detail">
					<div class="box classroom">
						<img src="/hdd/Public/weixin/images/classroom.png">
						<p>教室&nbsp<?php echo ($place); ?></p>	<!--教室信息-->
						<p id="classroom"></p>
					</div>
					<div class="box weeks">
						<img src="/hdd/Public/weixin/images/weeks.png">
						<p>周数 星期<?php echo ($week); ?></p>	<!--周数信息-->
						<p id="weeks"></p>
					</div>
					<div class="box class-num">
						<img src="/hdd/Public/weixin/images/class-num.png">
						<p>节数&nbsp第<?php echo ($start_jie); ?>节—第<?php echo ($end_jie); ?>节</p>	<!--节数信息-->
						<p id="class-num"></p>
					</div>
					<div class="box class-time">
						<img src="/hdd/Public/weixin/images/class-time.png">
						<p>时间&nbsp 8:00—8:45</p>	<!--时间信息-->
						<p id="class-time"></p>
					</div>
				</div>
			</div>
		
			<div class="weui-cells">
				<div class="weui-cell weui-cell_access" onclick="TeacherInfo()">
					<div class="weui-cell__bd">授课老师&nbsp&nbsp&nbsp<?php echo ($teachernum); ?></div>
		     		<div class="weui-cell__ft" style="font-size: 0">
			      		<span style="vertical-align:middle; font-size: 17px;">详细信息</span>
  		 				<span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
  		 			</div>
				</div>
			</div>		<!--授课老师-->

			<div class="weui-cells cells-students" onclick="StudentInfo()">
				<div class="weui-cell weui-cell_access">
					<div class="weui-cell__bd">课堂同学&nbsp&nbsp&nbsp<?php echo ($studentnum); ?></div>
		     		<div class="weui-cell__ft" style="font-size: 0">
			      		<span style="vertical-align:middle; font-size: 17px;">详细信息</span>
  		 				<span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span>
  		 			</div>
				</div>
			</div>		<!--课堂同学-->
    
		</div>
	</div>
	<script type="text/javascript">
		function TeacherInfo(){
			window.location.href = "?c=Wxcourse&a=courseteacher&c_id=<?php echo ($c_id); ?>";
		}

		function StudentInfo(){
			window.location.href = "?c=Wxcourse&a=coursestudent&c_id=<?php echo ($c_id); ?>";
		}

		function checknotice(){
			window.location.href = "?c=Wxstudent&a=checknotice&c_id=<?php echo ($c_id); ?>";
		}

		function goback(){
			history.go(-1);
		}
	</script>
</body>
</html>