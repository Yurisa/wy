<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微语</title>
	<meta name="viewport" content="width = device-width, user-scalable = no, initial-scale = 1">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/weui.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-notice.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
</head>
<body>
	<div class="container">
		<div class="top">
			<div class="left"><a href=""><img src="/hdd/Public/weixin/images/back.png" id="backIcon" onclick="goback()"></a></div> <!--返回按钮-->
			<div class="title">历史通知</div>
			<div class="right"></div>	
		</div>
		<div class="hold"></div>
		<div id="notice">
		<?php if(is_array($noticedata)): $i = 0; $__LIST__ = $noticedata;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$value): $mod = ($i % 2 );++$i;?><table id="information">
				<tr>
					<td><div class="note"><h5><?php echo (date('Y-m-d H:i',$value["timer"])); ?></h5>
					<p><?php echo ($value["content"]); ?></p>
					</div></td>
				</tr>
			</table><?php endforeach; endif; else: echo "" ;endif; ?>	
		</div>
	</div>
	<script type="text/javascript">
		function goback(){
			history.go(-1);
		}
	</script>
</body>
</html>