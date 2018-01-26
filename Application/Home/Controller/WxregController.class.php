<?php
namespace Home\Controller;
use Think\Controller;
use Org\Util\String;
use Org\Util\Match;


class  WxregController extends Controller{
 public function _construct(){

     }
   

   public function login(){

   	$this->display('wx:wx_Bind1');
   	// echo sweetAlert("绑定失败，验证码错误！",'操作失败',2,"history.go(-1);");

   }

   public function Verify(){
    	$Verify = new \Think\Verify();
        $Verify->fontSize = 40;
        //$Verify->length   = 3;
		$Verify->entry('login');
		     }

   public function loginUser(){
         $userId = I('post.userId');
         $select = I('post.select');
         $pwd = I('post.password');
         $xypwd = I('post.out-password');
         $code = I('post.code');
         $verify = new \Think\Verify();
         if (!$verify->check($code, 'login')) {
            echo sweetAlert("绑定失败，验证码错误！",'操作失败',2,"history.go(-1);");
            exit();
          }

          // if (!Match::match_pwd($pwd)||!Match::match_pwd($xypwd)) {
          //    $this->json(0, '密码格式不正确', $pwd);
          // }

         if ($select=='teacher') {
               $teacherModel = M('teacher');
               $userdata = $teacherModel->where("t_id='{$userId}'")->field('t_id,name,pwd,xypwd')->find();
           if(!empty($userdata)){
                if ($userdata['pwd']==$pwd&&$userdata['xypwd']==$xypwd) {
                  session('teacher.userName',$userdata['name']);
                  session('teacher.userId',$userdata['t_id']);
                 echo "<script language='javascript'>window.location.href = '?c=Wxteacher&a=index';</script>";
                exit();
                }
               }
              echo sweetAlert("登陆失败，账号或密码错误！",'操作失败',4,"history.go(-1);");
               exit();

          }
              
           else if ($select=='student') {
            $studentModel = M('student');
            $userdata = $studentModel->where("s_id='{$userId}'")->field('s_id,s_name,s_pwd,s_xypwd')->find();
            if(!empty($userdata)){
                if ($userdata['s_pwd']==$pwd&&$userdata['s_xypwd']==$xypwd) {
                          
            session('student.userName',$userdata['s_name']);
            session('student.userId',$userdata['s_id']);
            echo "<script language='javascript'>window.location.href = '?c=Wxstudent&a=index';</script>";
            exit();
                }
            }  
          echo sweetAlert("登陆失败，账号或密码错误！",'操作失败',2,"history.go(-1);");
           exit();  
          }
         

    }


    public function json($code, $result = 'ok', $body = NULL)
    {
        echo json_encode(array(
            'code' => $code,
            'result' => $result,
            'body' => $body
        ));
        exit();
    }
}