<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
	 <link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/weui.min.css">
	 <link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/weui.css">
	 <link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
	<title>微语</title>
</head>
<body ontouchstart>
	<div class="container">
		<div class="top">
			<div class="left"><a href=""><img src="/hdd/Public/weixin/images/back.png" id="backIcon" onclick="goback()"></a></div> <!--返回按钮-->
			<div class="title">课堂同学</div>
			<div class="right"></div>			
		</div>
		<div class="hold"></div>
		<?php if(is_array($studentlist)): $i = 0; $__LIST__ = $studentlist;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$value): $mod = ($i % 2 );++$i;?><div class="weui-cells">
		    <a href="?c=Wxcourse&a=coursestudentInfo&s_id=<?php echo ($value["s_id"]); ?>" class="weui-cell weui-cell_access">
		        <div class="weui-cell__bd">
		            <p><?php echo ($value["s_name"]); ?></p>
		            <p>15级&nbsp;&nbsp;&nbsp;&nbsp;<?php echo ($value["s_department"]); ?></p>
		        </div>
		        <div class="weui-cell__ft"></div>
		    </a>
		</div><?php endforeach; endif; else: echo "" ;endif; ?>
		<div class="weui-panel__ft">
		    <a href="#" class="weui-cell weui-cell_access weui-cell_link">
		        <div class="weui-cell__bd">查看更多</div>
		        <span class="weui-cell__ft"></span>
		    </a>
		</div>
	</div>
   <script type="text/javascript">
		function goback(){
			history.go(-1);
		}
   </script>
</body>
</html>