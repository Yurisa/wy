<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微语</title>
	<meta name="viewport" content="width = device-width, user-scalable = no, initial-scale = 1">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/weui.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-detail.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/btn-style.css">
</head>
<body>
	<div class="container">
		<div class="top">
			<div class="left"><a href=""  ><img src="/hdd/Public/weixin/images/back.png" id="backIcon" onclick="goback()"></a></div> <!--返回按钮-->
			<div class="title">课程详情</div>
			<div class="right"></div>			
		</div>
		<div class="hold"></div>
		<div class="box theDetailArea">
			<div class="area">
				<div class="box className"><p id="className"><?php echo ($name); ?></p>	<!--课程名-->
				<div class="box theInputArea">
					<input type="button" class="btn btn-primary" id="checkBtn" name="checkBtn" onclick="sendnotice()" value="发送通知"><!--发送通知按钮-->
					<input type="button" class="btn btn-primary" id="DT-SignBtn" name="Detail-SignBtn" value="查看签到" onclick="checkin()"><!--查看签到按钮-->
				</div>				
				</div>
				<div class="detail">
					<div class="box classroom">
						<img src="/hdd/Public/weixin/images/classroom.png">
						<p>教室&nbsp<?php echo ($place); ?></p>	<!--教室信息-->
					</div>
					<div class="box weeks">
						<img src="/hdd/Public/weixin/images/weeks.png">
						<p>周数 星期<?php echo ($week); ?></p>	<!--周数信息-->
					</div>
					<div class="box class-num">
						<img src="/hdd/Public/weixin/images/class-num.png">
						<p>节数&nbsp第<?php echo ($start_jie); ?>节—第<?php echo ($end_jie); ?>节</p>	<!--节数信息-->
					</div>
					<div class="box class-time">
						<img src="/hdd/Public/weixin/images/class-time.png">
						<p>时间&nbsp 8:00—8:45</p>	<!--时间信息-->
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
	</div>
	<script type="text/javascript">
	    function TeacherInfo(){
			window.location.href = "?c=Wxcourse&a=courseteacher&c_id=<?php echo ($c_id); ?>";
		}

		function StudentInfo(){
			window.location.href = "?c=Wxcourse&a=coursestudent&c_id=<?php echo ($c_id); ?>";
		}

		function sendnotice(){
			window.location.href = "?c=Wxteacher&a=shownotice&c_id=<?php echo ($c_id); ?>";
		}
		function goback(){
		  window.location.href = '?c=Wxteacher&a=index';
		  window.event.returnValue=false;
		 // window.location.href = "?c=Wxteacher";
		}
	

var getweek = theWeek()-getWeekNumber(2017,02,19)+1;

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
var c_id = parseInt("<?php echo ($c_id); ?>");
var nowweek = parseInt("<?php echo ($nowweek); ?>");
 	function checkin(){
 		if (getweek!=nowweek) {
 			alert("不是当前周");
 		}else{
			window.location.href = "?c=Wxteacher&a=checkin&c_id=<?php echo ($c_id); ?>&nowweek=<?php echo ($nowweek); ?>";
 		}
		}
	</script>
</body>
</html>