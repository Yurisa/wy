<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微语</title>
	<meta name="viewport" content="width = device-width, user-scalable = no, initial-scale = 1">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/weui.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-notice.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
	<style type="text/css">
		#input {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			height: 50px;
		}

		#content {
			height: 35px;
			width: 75%;
			font-size: 18px;
			position: absolute;
			top: 50%;
			left: 2%;
			transform: translate(0, -50%);
			border: none;
		}

		#submit {
			background: #FFC107;
			color: #fff;
			display: inline-block;
			height: 40px;
			width: 20%;
			position: absolute;
			top: 50%;
			right: 1%;
			transform: translate(0, -50%);
			line-height: 40px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="top">
			<div class="left"><a href=""><img src="/hdd/Public/weixin/images/back.png" id="backIcon" onclick="goback()"></a></div> <!--返回按钮-->
			<div class="title">发布通知</div>
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
		<div id="input">
		   <form action="?c=Wxteacher&a=sendnotice" method="post">
			<input type="text" placeholder="请输入您要发布的内容" name="content" id="content">
			<input type="hidden" name="c_id" value="<?php echo ($c_id); ?>">
			<input type="submit" name="submit" id="submit" class="weui-btn weui-btn_default" value="发布" onclick="clear()">
			</form>
		</div>
	</div>

	<script type="text/javascript">
	    // alert(<?php echo ($c_id); ?>);
		function goback(){
			window.location.href = "?c=Wxteacher&a=t_coursedetail&c_id=<?php echo ($c_id); ?>";
			window.event.returnValue=false;
		}
		function clear(){
			document.getElementById('content').innerHTML = "";
		}
	</script>
</body>
</html>