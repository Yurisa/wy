<?php
namespace Home\Controller;
use Think\Controller;

class WxteacherController extends Controller{

   public function _construct(){
   	
   }
   public function index(){
    $preclassModel = M('preclass');
    $classtimeModel = M('zhh_class_time');
    $teacherclasslist = $preclassModel->select();
    $classtime = $classtimeModel->where("school_id=10000")->find();
    $this->assign('classtime',$classtime);
    
    $this->display('wx:wx_TeacherCourses');
  // echo "<script>alert(1);</script>";
  }
  
   public function weeklycourse(){
     $t_id = session('teacher.userId');
     if (!empty(I('get.nowweek'))) {
       $nowweek = I('get.nowweek');
       $tcModel = M('tc');
       $classObj = M('preclass');
       $teaclassid = $tcModel->where("t_id='{$t_id}'")->select();
     foreach($teaclassid as $v){
      $value[] = $classObj->where("c_id='{$v['c_id']}' AND start_week<='{$nowweek}' AND '{$nowweek}'<=end_week")->find();
      // echo $value;
      $teaclasslist['list'] = array_filter($value);
      // echo  $classObj->getLastSql();
     }
   // var_dump($value);
     echo json_encode($teaclasslist);
   }
   }


   public function t_coursedetail(){ 
       $nowweek = I('get.nowweek');
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
       $this->assign('nowweek',$nowweek);
       $this->assign('name',$name);
       $this->assign('place',$place);
       $this->assign('start_jie',$start_jie);
       $this->assign('end_jie',$end_jie);
       $this->assign('week',$week);
       $this->assign('c_id',$c_id);
       $this->assign('studentnum',$studentnum);
       $this->assign('teachernum',$teachernum);
       $this->display('wx:wx_T-Detail');
   


    }

    
    public function showcreateclass(){
      $t_id = session('teacher.userId');
      $this->display('wx:wx_TeacherCreateCourse');
    }
    public function createclass(){
    $t_id = session('teacher.userId');
  	$classModel = M('preclass');
    $Model = new \Think\Model();
    $tcModel = M('tc');
  	$name = I('post.className');
    $teacher = I('post.teacher');
  	$place = I('post.classPlace');
  	$start_jie = I('post.start_jie');
  	$end_jie = I('post.end_jie');
    $start_week = I('post.start_week');
    $end_week = I('post.end_week');
  	$week = I('post.week');
    $data = array(
        'name' => $name,
        'teachername'=> $teacher,
        'place' => $place,
        'start_jie' => $start_jie,
        'end_jie' => $end_jie,
        'start_week' => $start_week,
        'end_week' => $end_week,
        'week' => $week,
        

      );
    $classModel->add($data);
    
    $c_idarr = $Model->query("select max(c_id) from preclass;");
     foreach ($c_idarr as $key => $value) {
       $c_id = $value['max(c_id)'];
     }
    // var_dump(  $c_id);
    
    $data2 = array(
        'c_id' => $c_id,
        't_id' => $t_id,
      );
    $tcModel->add($data2,array(),true);
    echo sweetAlert("添课成功",'操作成功',1,"window.location.href = '?c=Wxteacher&a=index';");
    // echo "<script language='javascript'>window.location.href = '?c=Wxteacher&a=index';</script>";
  }
   //  public function sendnotice(){
   //     $noticeModel = M('notice');
   //     $noticelist = $noticeModel->select();
   //     $this->assign('noticelist',$noticelist);
   //     $this->display('Wx:wx_');

   // }

  public function shownotice(){
      $c_id = intval(I('get.c_id'));
      $noticeModel = M('notice');
      $noticedata = $noticeModel->where("c_id='{$c_id}'")->select();
      $this->assign("c_id",$c_id);
      $this->assign("noticedata",$noticedata);
      $this->display("wx:wx_Notice-teacher");

  }

  public function sendnotice(){
    $content = I('post.content');
    $c_id = intval(I('post.c_id'));
    $timer = time();
    $data['c_id'] = $c_id;
    $data['content'] = $content;
    $data['timer'] = $timer;
    $noticeModel= M('notice');
    $noticeModel->data($data)->add($data);
   //  echo $c_id;
   //  echo "<br>";
   // echo $noticeModel->getLastSql();
   echo sweetAlert("发布成功",'操作成功',1,"window.location.href = '?c=Wxteacher&a=shownotice&c_id={$c_id}';");
  
  }
  public function checkin(){
    $nowweek = I('get.nowweek');
    $c_id = I('get.c_id');

    $Model = new \Think\Model();
   $absencestudata = $Model->query("select * from student where s_id in(select s_id from sc where s_id not in(select s_id from image_stu where c_id='{$c_id}' and nowweek='{$nowweek}') );");
   


    $notcheckinstudata = $Model->query("select student.s_id,student.s_name,image_stu.condition,image_stu.time,image_stu.src from student,image_stu where image_stu.c_id='{$c_id}' and student.s_id=image_stu.s_id and nowweek ='{$nowweek}' and image_stu.condition like '待审核'");
    // var_dump($notcheckinstudata);
    $checkinstudata = $Model->query("select student.s_id,student.s_name,image_stu.condition,image_stu.time,image_stu.src from student,image_stu where image_stu.c_id='{$c_id}' and student.s_id=image_stu.s_id and nowweek ='{$nowweek}' and image_stu.condition='已签到'");
     // var_dump($checkinstudata);
    $this->assign('absencestudata',$absencestudata);
    $this->assign('notcheckinstudata',$notcheckinstudata);
    $this->assign('checkinstudata',$checkinstudata);
    $this->assign('nowweek',$nowweek);
    $this->assign('c_id',$c_id);
    $this->display('wx:wx_Sign-in');
  }

  public function confirm(){
    $s_idlist = I('post.checkSign-in');
    // print_r( $s_idlist);
    $c_id = intval(I('get.c_id'));
    $nowweek = intval(I('get.nowweek'));
    $Model = M('image_stu');
    foreach($s_idlist as $k ){
      // $Model->query("update image_stu set condition='已签到' where s_id='{$k}' and nowweek='{$nowweek}' and c_id = '{$c_id}'");
    $Model->condition = '已签到';
    $Model->where("s_id='{$k}' and nowweek='{$nowweek}' and c_id = '{$c_id}'")->save();
      // echo $Model->getLastSql();

    }
    echo sweetAlert("审核完毕",'操作成功',1,"window.location.href = '?c=Wxteacher&a=checkin&c_id={$c_id}&nowweek={$nowweek}';");

  }

}