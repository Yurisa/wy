<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
	 <link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/weui.min.css">
	 <link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
	 <link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/STInformationCss.css">
	<title>微语</title>
</head>
<body ontouchstart>
	<div class="container">
		<div class="box top">
		    <div class="left"><a href=""><img src="/hdd/Public/weixin/images/back.png" id="backIcon" onclick="goback()"></a></div> <!--返回按钮-->
			<div class="title">授课老师</div>
			<div class="right"></div>	
		</div>
		<div class="hold"></div>
		<?php if(is_array($teacherlist)): $i = 0; $__LIST__ = $teacherlist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$value): $mod = ($i % 2 );++$i;?><div class="studentTable">
				<table cellpadding="0" cellspacing="15" border="0" width="100%">
					<tr>
						<td colspan="3" height="25"></td>
					</tr>
					<tr>
						<td><img src="/hdd/Public/weixin/images/teacher.png"></td>
						<td><font class="label">姓名</font></td>
						<td><?php echo ($value["name"]); ?></td>
					</tr>
					<tr>
						<td></td>
						<td><font class="label">所属系部</font></td>
						<td><?php echo ($value["department"]); ?></td>
					</tr>
					<tr>
						<td></td>
						<td><font class="label">所属专业</font></td>
						<td><?php echo ($value["profession"]); ?></td>
					</tr>
					<tr>
						<td></td>
						<td><font class="label">性别</font></td>
						<td><?php echo ($value["gender"]); ?></td>
					</tr>
					<tr>
						<td colspan="3"></td>
					</tr>
				</table>
			</div>
			<div class="bottom">
				<table>
					<tr>
						<td>
							<img src="/hdd/Public/weixin/images/wechat.png" id="wechat">
					
						</td>
						<td>:</td>
						<td>Abc123</td>
					</tr>
				</table>
			</div><?php endforeach; endif; else: echo "" ;endif; ?>	
	</div>
	<script type="text/javascript">
		function goback(){
			history.go(-1);
		}
	</script>
</body>
</body>
</html>