<?php
namespace Home\Controller;
use Think\Controller;
class WxstudentController extends Controller{


  public function _construct(){


  }
  public function index(){
    $s_id = session('student.userId');
    // $s_id = I('get.s_id');
    $classtimeModel = M('zhh_class_time');
    $classtime = $classtimeModel->where("school_id=10000")->find();
    // $nowweek = 1;
    $Model1 = M('sc');
    $classObj = M('class');
    $stuclassid = $Model1->where("s_id='{$s_id}'")->select();
    foreach($stuclassid as $v){
      $stuclasslist[] =  $classObj->where("c_id='{$v['c_id']}' AND start_week=1")->find();
     }
    // echo $s_id;
    // var_dump($stuclassid);
    // print_r($stuclasslist);
     $this->assign('s_id',$s_id);
     $this->assign('stuclasslist',$stuclasslist);
     $this->assign('classtime',$classtime);
     $this->display('wx:wx_StudentCourses');

  }
   public function weeklycourse(){
     $s_id = session('student.userId');
     if (!empty(I('get.nowweek'))) {
       $nowweek = I('get.nowweek');
       $Model1 = M('sc');
       $classObj = M('class');
       $stuclassid = $Model1->where("s_id='{$s_id}'")->select();
     foreach($stuclassid as $v){
      $value[] = $classObj->where("c_id='{$v['c_id']}' AND start_week<='{$nowweek}' AND '{$nowweek}'<=end_week")->find();
      
      $stuclasslist['list'] = array_filter($value);
      // echo  $classObj->getLastSql();
     }
   // var_dump($value);
     echo json_encode($stuclasslist);
   }
   }
   
 
   public function s_coursedetail(){
       $c_id = I('get.c_id');
       $classObj = M('class');
       $studentObj = M('student');
       $teacherObj = M('teacher'); 
       $Model1 = M('sc');
       $Model2 = M('tc'); 
       $classdata = $classObj->where("c_id='{$c_id}'")->find();
       $studentid = $Model1->field('s_id')->where("c_id='{$c_id}'")->select();
       $teacherid = $Model2->field('t_id')->where("c_id='{$c_id}'")->select();
       foreach($studentid as $v){
          $studentlist[] = $studentObj->where("s_id='{$v['s_id']}'")->find();

       }
       foreach($teacherid as $x){
          $teacherlist[] = $teacherObj->where("t_id='{$x['t_id']}'")->find();
       }
       $studentnum = count($studentlist);
       $teachernum = count($teacherlist);
       $name = $classdata['name'];
       $place = $classdata['place'];
       $start_jie = $classdata['start_jie'];
       $end_jie = $classdata['end_jie'];
       $week = $classdata['week'];
       $this->assign('name',$name);
       $this->assign('place',$place);
       $this->assign('start_jie',$start_jie);
       $this->assign('end_jie',$end_jie);
       $this->assign('week',$week);
       $this->assign('c_id',$c_id);
       $this->assign('studentnum',$studentnum);
       $this->assign('teachernum',$teachernum);
       $this->display('wx:wx_S-Detail');
   


    }

    public function s_coursestudent(){
       $id = I('post.id');
       $classObj = M('class');
       $studentObj = M('student');
       $Model1 = M('sc');
       $classdata = $classObj->where("c_id='{$id}'")->find();
       $studentid = $Model1->field('s_id')->where("c_id='{$id}'")->select();
       foreach($studentid as $v){
          $studentlist[] = $studentObj->where("s_id='{$v['s_id']}'")->find();
       
       }
       $this->assign('studentlist',$studentlist);
       $this->display('wx:wx_Coursestudent');
    }
    
    public function s_courseteacher(){
       $id = I('post.id');
       $classObj = M('class');
       $teacherObj = M('teacher'); 
       $Model1 = M('sc'); 
       $classdata = $classObj->where("id='{$id}'")->find();
       $teacherid = $Model1->field('t_id')->where("c_id='{$id}'")->select();
       foreach($teacherid as $x){
          $teacherlist[] = $teacherObj->where("t_id='{$x['t_id']}'")->find();
       }
      $this->assign('teacherlist',$teacherlist);
      $this->display('wx:wx_Courseteacher');
    }

    public function s_addtclass(){
      $s_id = I('get.s_id');
      $classModel = M('preclass');
      $preclassdata = $classModel->select();
      $preclassnum =$classModel->count();
      $this->assign('s_id',$s_id);
      $this->assign('preclassnum',$preclassnum);
      $this->assign('preclassdata',$preclassdata);
      $this->display('wx:wx_AddCourseStu');
    }

    public function checknotice(){
      $c_id = intval(I('get.c_id'));
      $noticeModel = M('notice');
      $noticedata = $noticeModel->where("c_id='{$c_id}'")->select();
      $this->assign("c_id",$c_id);
      $this->assign("noticedata",$noticedata);
      $this->display("wx:wx_Notice-student");
 
    }
    public function dealcoursedata(){
       $s_id = I('get.s_id');
       $courseid = I('post.coursedata');
       // var_dump($courseid);
       $scModel = M('sc');
       $preclassModel = M('preclass');
       $classModel = M('class');
     foreach ($courseid as $value) {
       $data1 = array('s_id'=>$s_id,'c_id'=>$value,);
       $scModel->add($data1,array(),true);
       // echo $scModel->getLastSql();
       // echo "<hr>";
       $preclassdata = $preclassModel->where("c_id='{$value}'")->find();
       // $data2 = array(
       //     'c_id'=>$preclassdata['c_id'],
       //     'name'=>$preclassdata['name'],
       //     'place'=>$preclassdata['place'],
       //     'start_jie'=>$preclassdata['start_jie'],
       //     'end_jie'=>$preclassdata['end_jie'],
       //     'week'=>$preclassdata['week'],
       //     'teachername'=>$preclassdata['teachername'],
       //  ); 
       $classModel->add($preclassdata,array(),true);
       // echo $classModel->getLastSql();
       echo sweetAlert("添课成功",'操作成功',1,"window.location.href = '?c=Wxstudent&a=index';");

      }
    }
    public function searchcourse(){
      // if (null!==(I('get.keyword')) || empty(I('get.keyword'))) {
      //      echo '{"success":false,"msg":"参数错误"}';
      //      return;
      //  }
       $keyword = I('get.keyword');
       // echo $keyword;
       $preclassModel = M('preclass');
       $where['name']=array('like',"".$keyword."%");
       $classdata = $preclassModel->where($where)->select();
       // var_dump ($classdata);
       foreach ($classdata as $value) {
          $result = json_encode($value);       
          // $result = '{"success":true,"课程编号"："{$value['c_id']}","课程名称"：$value['name'],"课程开始节数"：$value['start_jie'],
          // "课程结束节数"：$value['end_jie'],"课程上课地点"：$value['place'],"任课教师"：$value['teachername']}';
       }
          echo $result;
    }
    public function signcourse(){
      $classname = I('post.classname');
      $teachername = I('post.classname');
      
    } 

}