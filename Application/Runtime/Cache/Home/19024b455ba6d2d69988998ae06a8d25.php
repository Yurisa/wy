<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD --><head>
        <meta charset="utf-8" />
        <title><?php echo ($page_title); ?>-<?php echo ($page_bigtitle); ?></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="/hdd/Public/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="/hdd/Public/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="/hdd/Public/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <link href="/hdd/Public/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.css" rel="stylesheet" type="text/css" />
        <link href="/hdd/Public/assets/global/plugins/fancybox/source/jquery.fancybox.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="/hdd/Public/assets/global/css/components.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <link href="/hdd/Public/assets/global/css/font.css" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <link href="/hdd/Public/assets/layouts/layout/css/layout.min.css" rel="stylesheet" type="text/css" />
        <link href="/hdd/Public/assets/layouts/layout/css/themes/darkblue.min.css" rel="stylesheet" type="text/css" id="style_color" />
        <script type="text/javascript" src="/hdd/Public/ueditor/ueditor.config.js"></script>
        <script type="text/javascript" src="/hdd/Public/ueditor/ueditor.all.js"></script>

        <link rel="stylesheet" type="text/css" href="/hdd/Public/jquery.tagsinput.css" />     
        <link rel="shortcut icon" href="favicon.ico" /> </head>
    <!-- END HEAD -->

    <body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
        <!-- BEGIN 顶端 -->
        <div class="page-header navbar navbar-fixed-top">
            <!-- BEGIN HEADER INNER -->
            <div class="page-header-inner ">
                <!-- BEGIN LOGO -->
                <div class="page-logo">
                    <div class="menu-toggler sidebar-toggler"> </div>
                </div>
                <!-- END LOGO -->
                <!-- BEGIN RESPONSIVE MENU TOGGLER -->
                <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
                <!-- END RESPONSIVE MENU TOGGLER -->
                <!-- BEGIN TOP NAVIGATION MENU -->
                <div class="top-menu">
                    <ul class="nav navbar-nav pull-right">
                        <!-- BEGIN 消息提醒列表 -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <!--<li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <i class="icon-bell"></i>
                                <span class="badge badge-default"> 4 </span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="external">
                                    <h3>
                                        <span class="bold">4条</span> 未处理消息</h3>
                                </li>
                                <li>
                                    <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">3 mins</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-danger">
                                                        <i class="fa fa-bolt"></i>
                                                    </span> 异常. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">10 mins</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-warning">
                                                        <i class="fa fa-bell-o"></i>
                                                    </span> 警告. </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="time">14 hrs</span>
                                                <span class="details">
                                                    <span class="label label-sm label-icon label-info">
                                                        <i class="fa fa-bullhorn"></i>
                                                    </span> 通知. </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>-->
                        <!-- END NOTIFICATION DROPDOWN -->

                        <!-- BEGIN 登陆用户属性 -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-user">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <img alt="" class="img-circle" src="/hdd/Public/assets/layouts/layout/img/celtics.jpg" />
                                <span class="username username-hide-on-mobile"> <?php echo (session('user')); ?> </span>
                                <i class="fa fa-angle-down"></i>
                            </a>
                           <!--  <ul class="dropdown-menu dropdown-menu-default">
                                <li>
                                    <a href="?c=reg&a=loginOut">
                                        <i class="icon-key"></i> 安全退出 </a>
                                </li>
                            </ul> -->
                        </li>
                        <!-- END USER LOGIN DROPDOWN -->
                    </ul>
                </div>
                <!-- END TOP NAVIGATION MENU -->
            </div>
            <!-- END HEADER INNER -->
        </div>
        <!-- END HEADER -->
        <!-- BEGIN HEADER & CONTENT DIVIDER -->
        <div class="clearfix"></div>
        <!-- END HEADER & CONTENT DIVIDER -->
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            <!-- BEGIN 工具栏 -->
            			<div class="page-sidebar-wrapper">
                <!-- BEGIN SIDEBAR -->
                <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                <div class="page-sidebar navbar-collapse collapse" >
                    <!-- BEGIN SIDEBAR MENU -->
                    <!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
                    <!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
                    <!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
                    <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
                    <!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
                    <!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
                    <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="100" style="padding-top: 20px">
                        <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
                        <li class="sidebar-toggler-wrapper hide">
                            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                            <div class="sidebar-toggler"> </div>
                            <!-- END SIDEBAR TOGGLER BUTTON -->
                        </li>
                        <li class="nav-item <?php if($page_bigtitle == '系统平台'): ?>start active open<?php endif; ?>">
                            <a href="javascript:;" class="nav-link nav-toggle">
                                <i class="icon-home"></i>
                                <span class="title">系统平台</span>
                                <span class="selected"></span>
                                <span class="arrow open"></span>
                            </a>
                            <ul class="sub-menu" style="display:block">
                                <li class="nav-item ">
                                    <a href="index.php?c=Teacher&a=teacher" class="nav-link ">
                                        <i class="icon-bar-chart"></i>
                                        <span class="title">教师管理概况</span>
                                        <span class="selected"></span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a href="?c=Teacher&a=teacher_data" class="nav-link ">
                                        <i class="icon-bulb"></i>
                                        <span class="title">教师个人信息</span>
                                        <!--<span class="badge badge-success">1</span>-->
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a href="?c=Teacher&a=class_gl" class="nav-link ">
                                        <i class="fa fa-file-image-o"></i>
                                        <span class="title">教师课程管理</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a href="?c=Teacher&a=student_gl" class="nav-link ">
                                        <i class="fa fa-file-image-o"></i>
                                        <span class="title">教师学生管理</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        
                       
                                  <!-- END SIDEBAR MENU -->
                </div>
                <!-- END SIDEBAR -->
            </div>
            <!-- END SIDEBAR -->
            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                
                <div class="page-content">
                    <!-- BEGIN PAGE HEADER-->
                    <!-- BEGIN 页面标题-->
                    <h3 class="page-title"><?php echo ($page_bigtitle); ?>
                        <small><?php echo ($page_title); ?></small>
                    </h3>
                    <div class="row">
                    	<div class="portlet box blue-chambray col-md-12">
                            <div class="portlet-title">
                                <div class="caption">
                                    <i class="fa fa-gift font-white"></i><?php echo ($page_title); ?> </div>
                            </div>
                            <!-- BEGIN VALIDATION STATES-->                               
                            <div class="portlet-body">
                                <!-- BEGIN FORM-->
                                     
                                    <div >
                                        
                                            
                                        <div >
                                            <label >
                                            教师姓名
                                            </label>
                                            <div >
                                                <p>
                                                <?php echo ($teacher["name"]); ?>
                                                </p>
                                            </div>
                                        </div>
                                         <div>
                                            <label>
                                            出生日期
                                            </label>
                                            <div>
                                                <p>
                                                <?php echo (date('Y-m-d',$teacher["birthday"])); ?>
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <label>
                                            教师简介
                                            </label>
                                            <div>
                                                <p><?php echo ($teacher["content"]); ?></p>
                                            </div>
                                        </div>

                                       
                                        
                                        <div>
                                            <label>手机号码
                                            <div>
                                                <p><?php echo ($teacher["pnum"]); ?></p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label>
                                            学历
                                            </label>
                                            <div >
                                                <p>
                                                <?php echo ($teacher["record"]); ?>
                                                </p>
                                            </div>
                                        </div>
                                     

                                        

                                        <!-- <div class="form-group form-md-line-input">
                                            <label class="col-md-1 control-label" for="form_control_1">自定义分类
                                            </label>
                                            <div class="col-md-9">
                                                <p class="form-control-static">当前所属分类</p>
                                            </div>
                                        </div>
                                        <div class="form-group form-md-line-input">
                                            <label class="col-md-1 control-label" for="form_control_1">加入自定义分类
                                            </label>
                                            <div class="col-md-9">
                                                <p class="form-control-static"></p>
                                            </div>
                                        </div> -->

                                        
                                        
                                   
                                    </div>
                            
                                <!-- END FORM-->
                            </div>                        
                            <!-- END VALIDATION STATES-->
                        </div>                        
                    	</div>
                   	                  
                    
                </div>
                
                <!-- END CONTENT BODY -->
            </div>
            <!-- END CONTENT -->
        </div>
        <!-- END CONTAINER -->
        
    
        <!--[if lt IE 9]>
        <script src="/hdd/Public/assets/global/plugins/respond.min.js"></script>
        <script src="/hdd/Public/assets/global/plugins/excanvas.min.js"></script> 
        <![endif]-->
        <!-- BEGIN CORE PLUGINS -->
        <script src="/hdd/Public/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
        <script src="/hdd/Public/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="/hdd/Public/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>

        <!-- 实例化编辑器 -->
        
        <!-- END CORE PLUGINS -->
        <script src="/hdd/Public/assets/global/plugins/bootstrap-tagsinput/bootstrap-tagsinput.min.js" type="text/javascript"></script>
        <script src="/hdd/Public/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
        <script src="/hdd/Public/assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
		<script src="/hdd/Public/assets/global/plugins/fancybox/source/jquery.fancybox.pack.js" type="text/javascript"></script>
        <script src="/hdd/Public/assets/global/plugins/plupload/js/plupload.full.min.js" type="text/javascript"></script>
        <script src="/hdd/Public/assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="/hdd/Public/assets/global/scripts/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <script src="/hdd/Public/assets/admin/ecommerce-products-edit.js" type="text/javascript"></script>
        <script src="/hdd/Public/assets/admin/form-validation-md.js"></script>
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="/hdd/Public/assets/layouts/layout/scripts/layout.min.js" type="text/javascript"></script>

        <script src="/hdd/Public/jquery.tagsinput.min.js" type="text/javascript"></script>

        <script src="/hdd/Public/ajaxupload.js" type="text/javascript"></script>
		
       
    </body>

</html>