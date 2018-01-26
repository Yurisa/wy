<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微语</title>
	<meta name="viewport" content="width = device-width, user-scalable = no, initial-scale = 1">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/style-top.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/btn-style.css">
	<link rel="stylesheet" type="text/css" href="/hdd/Public/weixin/css/Bind1.css">
	
</head>
<body>
	<div class="container">
		<div class="box top">
			<span id="title"><b>绑&nbsp;定</b></span>
			<img src="/hdd/Public/weixin/images/Bind-bg.png" id="topImg">
		</div>
		<div class="hold2"></div>
		<form id="bind" action="?c=Wxreg&a=loginUser" method="post">
			<div class="theBindArea" id="bindbox">
				<p id="userId">
					<!-- <label for="userName">用户名</label> -->
					<input type="text" placeholder="工号/学号" name="userId" class="normal">
				</p>
				
				<p id="password">
					<!-- <label for="password">密码</label> -->
					<input type="password" placeholder="密码" name="password" class="normal">
				
				</p>
				
				<p id="out-password">
					<!-- <label for="out-password">校外访问密码</label> -->
					<input type="password" placeholder="校外访问密码" name="out-password" class="normal">
					
				</p>
				
				<p>
					<!-- <label for="school">学校</label> -->
					<div class="school">
						<select name="province" form="bind">
						<option value="省">-省-</option>
					</select>
					<select name="city" form="bind">
						<option value="市">-市-</option>
					</select>
					<select name="school" form="bind">
						<option value="学校">-学校-</option>
					</select>
					</div>
					
				</p>
				
				<p class="pCheck box">
					<!-- <label for="check">验证码</label> -->
					<input type="text" placeholder="验证码" name="code" class="normal check">
					<img src="?c=Wxreg&a=Verify"  onClick="src='?c=Wxreg&a=Verify&s='+Math.random();" id="checkImg" />
	
				</p>
				<p>
					<span class="radio"><input type="radio" name="select" value="teacher" class="select">教师
					<input type="radio" name="select" value="student" class="select">学生</span>
				</p>
				<div class="button" id="bindBtn">
					<!-- <input type="submit" class="weui-btn weui-btn_default" name="bindBtn" value="下一步"> -->
					<input type="submit" class="btn btn-primary" name="bindBtn" value="下一步">
				
				</div>
				
				
			</div>
			
		</form>
	
	</div>
	
</body>
</html>