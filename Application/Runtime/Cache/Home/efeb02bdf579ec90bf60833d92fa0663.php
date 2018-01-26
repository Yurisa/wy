<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微语</title>
	<meta name="viewport" content="width = device-width, user-scalable = no, initial-scale = 1">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/btn-style.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/sign-in-style.css">

</head>
<body>
	<div class="container">
		<div class="top">
			<div class="left"><a href=""><img src="/hdd/Public/weixin/images/back.png" id="backIcon"></a></div> <!--返回按钮-->
			<div class="title">查看签到</div>
			<div class="right"></div>			
		</div>
		<div class="hold"></div>
		<?php if(is_array($absencestudata)): $i = 0; $__LIST__ = $absencestudata;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$value): $mod = ($i % 2 );++$i;?><div class="box theAbsenceSignArea">
		
		<table cellpadding="0" cellspacing="0" border="0" width="90%">
			<tr>
				<td class="name">学号</td>
				<td id="studentID" colspan="2">
					<?php echo ($value["s_id"]); ?>
				</td>
				<td rowspan="2" id="signStatus" class="case">
					<img src="/hdd/Public/weixin/images/delete.png">
				</td>
			</tr>
			<tr>
				<td class="name case">姓名</td>
				<td id="studentName" class="case">
					<?php echo ($value["s_name"]); ?>
				</td>
				
			</tr>
		</table>
	</div><?php endforeach; endif; else: echo "" ;endif; ?>
<?php if(is_array($checkinstudata)): $i = 0; $__LIST__ = $checkinstudata;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$value): $mod = ($i % 2 );++$i;?><div class="box theOldSignArea">
		<div id="SignDate">
			<b><?php echo (date('Y-m-d H:i',$value["time"])); ?></b>
		</div>
		<table cellpadding="0" cellspacing="0" border="0" width="90%">
			<tr>
				<td class="name">学号</td>
				<td id="studentID" colspan="2">
					<?php echo ($value["s_id"]); ?>
				</td>
				<td rowspan="2" id="signStatus" class="case">
					<img src="/hdd/Public/weixin/images/ok.png">
				</td>
			</tr>
			<tr>
				<td class="name case">姓名</td>
				<td id="studentName" class="case">
					<?php echo ($value["s_name"]); ?>
				</td>
				
			</tr>
		</table>
	</div><?php endforeach; endif; else: echo "" ;endif; ?>
	<hr>
	<form action="?c=Wxteacher&a=confirm&c_id=<?php echo ($c_id); ?>&nowweek=<?php echo ($nowweek); ?>" method="post">
	<?php if(is_array($notcheckinstudata)): $i = 0; $__LIST__ = $notcheckinstudata;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$value): $mod = ($i % 2 );++$i;?><div class="box theNowSignArea">
		<div id="SignDate">
			<b><?php echo (date('Y-m-d H:i',$value["time"])); ?></b>
		</div>
		<table cellpadding="0" cellspacing="0" border="0" width="90%">
			<tr>
				<td class="name">学号</td>
				<td id="studentID">
					<?php echo ($value["s_id"]); ?>
				</td>
			</tr>
			<tr>
				<td class="name">姓名</td>
				<td id="studentName" width="100%">
					<?php echo ($value["s_name"]); ?>
				</td>
			</tr>
			<tr>
				<td id="picID" class="name">照片</td>
				<td id="pic">
					<img src="<?php echo ($value["src"]); ?>">
				</td>
			</tr>
			<div id="theCheckArea">
				<tr>
					<td colspan="2" class="box1">
						<input type="checkbox" name="checkSign-in[]" id="checkBtn" value="<?php echo ($value["s_id"]); ?>">
					</td>
				</tr>
			</div>
			
		</table>
		<!-- <hr> -->
	</div><?php endforeach; endif; else: echo "" ;endif; ?>
	<div class="theSubmitArea">
		<input type="submit" class="btn btn-primary" name="bindBtn" value="提交">
	</div>
	</form>
		
	</div>
</body>
</html>