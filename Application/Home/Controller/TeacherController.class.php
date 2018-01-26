<?php
namespace Home\Controller;
use Think\Controller;

class TeacherController  extends Controller{
    public function _construct(){

     }
   public function teacher(){
          // unset($today_class_num);
          // $start = strtotime('today');
          // $end = strtotime('tomorrow');
          // $map['starttime'] = array('GT',$start);
          // $where['starttime'] = array('LT',$end); 
            $teacherdata = M('teacher')->where('t_id=1130299001')->find();
            $classnum = M('class')->count();
            $studentnum = M('student')->count();
            // $today_class_num = M('class')->where($map)->where($where)->count();
            // $toclass = M('class')->
            // print_r($teacherdata);
            // $this->assign('today_class_num',$today_class_num);
            $this->assign('studentnum',$studentnum);
             $this->assign('teacherdata',$teacherdata);
             $this->assign('classnum',$classnum);
             $this->assign('page_bigtitle', '用户管理');
             $this->assign('page_title', '教师管理用户');
             $this->display('admin:teacher');



       }

      public function today_class(){
          $start = strtotime('today');
          $end = strtotime('tomorrow');
          $map['starttime'] = array('GT',$start);
          $where['starttime'] = array('LT',$end); 
          $today_class = M('class')->where($map)->where($where)->select();
          $this->assign('today_class',$today_class);
          $this->assign('page_bigtitle', '当天课程管理');
          $this->assign('page_title', '教师当天课程');
          $this->display('admin:today_class');
       }

    public function class_gl(){
      $classlist = M('class')->select();   
       $this->assign('page_bigtitle', '课程管理'
        );
       $this->assign('page_title', '教师课程管理');  
      $this->assign('classlist',$classlist);
      $this->display('admin:class');
    }

    public function student_gl(){
      $studentlist = M('student')->order('s_id asc')->select();
        $this->assign('page_bigtitle', '学生管理');
       $this->assign('page_title', '教师学生管理');
       $this->assign('studentlist',$studentlist);
       $this->display('admin:student');
        }


     public function teacher_data(){
         $teacher = M('teacher')->where('t_id=1130299001')->find();
         $this->assign('teacher',$teacher);
         $this->assign('page_bigtitle', '学生管理');
         $this->assign('page_title', '教师学生管理');
         $this->display('admin:teacher_data');


     }   

    }