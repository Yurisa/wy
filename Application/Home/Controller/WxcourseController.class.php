<?php
namespace Home\Controller;
use Think\Controller;
use Org\Util\String;
use Org\Util\Match;


class WxcourseController extends Controller{
	
	// public function __construct()
	// {


	// }

	public function coursestudent(){
       $id = I('get.c_id');
       $classObj = M('class');
       $studentObj = M('student');
       $teacherObj = M('teacher'); 
       $Model1 = M('sc');
       $Model2 = M('tc'); 
       $classdata = $classObj->where("c_id='{$id}'")->find();
       $studentid = $Model1->field('s_id')->where("c_id='{$id}'")->select();
       $teacherid = $Model2->field('t_id')->where("c_id='{$id}'")->select();
       foreach($studentid as $v){
          $studentlist[] = $studentObj->where("s_id='{$v['s_id']}'")->find();

       }
       foreach($teacherid as $x){
          $teacherlist[] = $teacherObj->where("t_id='{$x['t_id']}'")->find();
       }
       $this->assign('studentlist',$studentlist);
       $this->display('wx:wx_CourseStudent');
    }

    public function coursestudentInfo(){
            $s_id = I('get.s_id');
            $studentObj = M('student');
            $studentdata = $studentObj->where("s_id='{$s_id}'")->find();
           
            $this->assign('studentdata',$studentdata);
            $this->display('wx:wx_StudentInformation');

    }
    
    public function courseteacher(){
    	 $id = I('get.c_id');
       $classObj = M('class');
       $studentObj = M('student');
       $teacherObj = M('teacher'); 
       $Model1 = M('sc');
       $Model2 = M('tc'); 
       $classdata = $classObj->where("c_id='{$id}'")->find();
       $studentid = $Model1->field('s_id')->where("c_id='{$id}'")->select();
       $teacherid = $Model2->field('t_id')->where("c_id='{$id}'")->select();
       foreach($studentid as $v){
          $studentlist[] = $studentObj->where("s_id='{$v['s_id']}'")->find();

       }
       foreach($teacherid as $x){
          $teacherlist[] = $teacherObj->where("t_id='{$x['t_id']}'")->find();
       }
    	$this->assign('teacherlist',$teacherlist);
    	$this->display('wx:wx_TeacherInformation');
    }
}