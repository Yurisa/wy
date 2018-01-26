<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
     public function _construct(){

     }


    public function index()
{
    $nonce = $_GET['nonce'];
    $token = 'zhh';
    $timestamp = $_GET['timestamp'];
    $echostr = $_GET['echostr'];
    $signature = $_GET['signature'];
    //形成数组，然后按字典序排序
    $array = array();
    $array = array($nonce, $timestamp, $token);
    sort($array);
    //拼接成字符串,sha1加密 ，然后与signature进行校验
     $str = sha1(implode($array));
     $str1 = ''.$signature.'/'.$echostr.'/'.$str.'';
     $this->log_result($file,$str1);
     if ($str == $signature && $echostr) {
         //第一次接入weixin api接口的时候
         echo $echostr;
         exit;
     } else {
        $this->reponseMsg();
     }
}
public function reponseMsg(){
		//1.获取到微信推送过来post数据（xml格式）
		$postArr = $GLOBALS['HTTP_RAW_POST_DATA'];
		//2.处理消息类型，并设置回复类型和内容
		/*<xml>
<ToUserName><![CDATA[toUser]]></ToUserName>
<FromUserName><![CDATA[FromUser]]></FromUserName>
<CreateTime>123456789</CreateTime>
<MsgType><![CDATA[event]]></MsgType>
<Event><![CDATA[subscribe]]></Event>
</xml>*/
		$postObj = simplexml_load_string( $postArr );
		//$postObj->ToUserName = '';
		//$postObj->FromUserName = '';
		//$postObj->CreateTime = '';
		//$postObj->MsgType = '';
		//$postObj->Event = '';
		// gh_e79a177814ed
		//判断该数据包是否是订阅的事件推送
		if( strtolower( $postObj->MsgType) == 'event'){
			//如果是关注 subscribe 事件
			if( strtolower($postObj->Event == 'subscribe') ){
				//回复用户消息(纯文本格式)	
				$toUser   = $postObj->FromUserName;
				$fromUser = $postObj->ToUserName;
				$time     = time();
				$msgType  =  'text';
				$content  = '欢迎关注微语';
				$template = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							</xml>";
				$info     = sprintf($template, $toUser, $fromUser, $time, $msgType, $content);
				echo $info;

			}
		}

		
		//用户发送tuwen1关键字的时候，回复一个单图文
		if( strtolower($postObj->MsgType) == 'text' && trim($postObj->Content)=='tuwen2' ){
			$toUser = $postObj->FromUserName;
			$fromUser = $postObj->ToUserName;
			$arr = array(
				array(
					'title'=>'imooc',
					'description'=>"imooc is very cool",
					'picUrl'=>'http://www.imooc.com/static/img/common/logo.png',
					'url'=>'http://www.imooc.com',
				),
				array(
					'title'=>'hao123',
					'description'=>"hao123 is very cool",
					'picUrl'=>'https://www.baidu.com/img/bdlogo.png',
					'url'=>'http://www.hao123.com',
				),
				array(
					'title'=>'qq',
					'description'=>"qq is very cool",
					'picUrl'=>'http://www.imooc.com/static/img/common/logo.png',
					'url'=>'http://www.qq.com',
				),
			);
			$template = "<xml>
						<ToUserName><![CDATA[%s]]></ToUserName>
						<FromUserName><![CDATA[%s]]></FromUserName>
						<CreateTime>%s</CreateTime>
						<MsgType><![CDATA[%s]]></MsgType>
						<ArticleCount>".count($arr)."</ArticleCount>
						<Articles>";
			foreach($arr as $k=>$v){
				$template .="<item>
							<Title><![CDATA[".$v['title']."]]></Title> 
							<Description><![CDATA[".$v['description']."]]></Description>
							<PicUrl><![CDATA[".$v['picUrl']."]]></PicUrl>
							<Url><![CDATA[".$v['url']."]]></Url>
							</item>";
			}
			
			$template .="</Articles>
						</xml> ";
			echo sprintf($template, $toUser, $fromUser, time(), 'news');

			//注意：进行多图文发送时，子图文个数不能超过10个
		}else {
			switch( trim($postObj->Content) ){
				case 1:
					$content = '您输入的数字是1';
				break;
				case 2:
					$content = '您输入的数字是2';
				break;
				case 3:
					$content = '您输入的数字是3';
				break;
				case 4:
					$content = "<a href='http://www.imooc.com'>慕课</a>";
				break;
				case '英文':
					$content = 'imooc is ok';
				break;
			}	
				$template = "<xml>
<ToUserName><![CDATA[%s]]></ToUserName>
<FromUserName><![CDATA[%s]]></FromUserName>
<CreateTime>%s</CreateTime>
<MsgType><![CDATA[%s]]></MsgType>
<Content><![CDATA[%s]]></Content>
</xml>";
//注意模板中的中括号 不能少 也不能多
				$fromUser = $postObj->ToUserName;
				$toUser   = $postObj->FromUserName; 
				$time     = time();
				// $content  = '18723180099';
				$msgType  = 'text';
				echo sprintf($template, $toUser, $fromUser, $time, $msgType, $content);
			
		}//if end
		if(strtolower($postObj->Event) == 'click'){
			if (strtolower(($postObj->EventKey) == 'item1')) {
				$content ='zhh是最棒的';
				$template = "<xml>
<ToUserName><![CDATA[%s]]></ToUserName>
<FromUserName><![CDATA[%s]]></FromUserName>
<CreateTime>%s</CreateTime>
<MsgType><![CDATA[%s]]></MsgType>
<Content><![CDATA[%s]]></Content>
</xml>";
//注意模板中的中括号 不能少 也不能多
				$fromUser = $postObj->ToUserName;
				$toUser   = $postObj->FromUserName; 
				$time     = time();
				// $content  = '18723180099';
				$msgType  = 'text';
				echo sprintf($template, $toUser, $fromUser, $time, $msgType, $content);
			
		}
			}
		
	}//reponseMsg end

    function user(){
    	echo "123";

    }

    function  log_result($file,$word)
{		
    $file= dirname($_SERVER['SCRIPT_FILENAME'])."/notify.log";//log文件路径
    
    $fp = fopen($file,"a");
    flock($fp, LOCK_EX) ;
    fwrite($fp,"执行日期：".date("Y-m-d H:i:s",time())." ".$word."\r\n");
    flock($fp, LOCK_UN);
    fclose($fp);
}

public function setButton(){
	$access_token = $this->getWxAccessToken();
	$url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='.$access_token;
	$postArr=array(
				'button'=>array(
			    
			     array(
					   'name'=>urlencode('绑定'),
					   'type'=>'view',
					   'url'=>'http://php.shuochuang.net/hdd/index.php?c=Wxreg&a=login'
					),
					),
					   
					);

						echo $postJson=urldecode(json_encode($postArr));
						$res=$this->http_curl($url,'post','json',$postJson);
						var_dump($res);
       }
    



	function getWxAccessToken(){
		// if ($_SESSION['access_token']&&$_SESSION['expire_time']>time()) {

		// 	return $_SESSION['access_token'];
		// }
  //    else{
		//1.请求url地址
		$appid = 'wxbd6ba2d898068938';
		$appsecret =  'f2b10468528ce2f6fe71ff0d2d6fb875';
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appsecret;
		$res = $this->http_curl($url,'get','json');
		$access_token = $res['access_token'];
		$_SESSION['access_token'] = $access_token;
		$_SESSION['expire_time'] = time()+7000 ;
		return $access_token;
	// }
}
	function http_curl($url,$type='get',$res='json',$arr=''){
		//获取imooc
		//1.初始化curl
		$ch = curl_init();
		// $url = 'http://php.shuochuang.net/hdd/';
		//2.设置curl的参数
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		if($type =='post'){
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS,$arr);

		}
		//3.采集
		$output = curl_exec($ch);
		//4.关闭
		curl_close($ch);
		if ($res=='json') {
			return json_decode($output,true);
			
		}
		
	}
	public function sendMsgAll(){
		$access_token = $this->getWxAccessToken();
		$url = "https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=".$access_token;

		// {     
  //   "touser":"OPENID",
  //   "text":{           
  //          "content":"CONTENT"            
  //          },     
  //   "msgtype":"text"
// }    
       $studentModel = M('student');
       $scModel = M('sc');
       $classModel = M('class');
       $s_idlist = $studentModel->field('s_id')->select();
       // echo "<hr>";
       // var_dump($s_idlist);
       // echo "<hr>";
       foreach($s_idlist as $value){
       $stu_openidarr = $studentModel->field('openid')->where("s_id='{$value['s_id']}'")->find();
       $stu_openid =$stu_openidarr['openid'];
       // echo "<hr>";
       // echo  $stu_openid;
       // echo '<hr>';
       $c_idlist = $scModel->field('c_id')->where("s_id='{$value['s_id']}'")->select();
       $time = time();
       $week =  date('N', $time);
       // echo $week;
       // echo '<hr>';
       // var_dump($c_idlist);
       // echo "<hr>";
       $content = "今日课程：";
       foreach($c_idlist as $value){
       // $value[] = $classModel->where("c_id='{$value['c_id']}' AND week='{$week}'")->find();
        // echo $classModel->getLastSql();
        $stu_class = $classModel->query("select * from class where c_id='{$value['c_id']}' and week='{$week}'");
         // $stu_class = array_filter($value);
         // var_dump($stu_class);

       
       
       $today_stu_class_num = count($stu_class);
       // echo $today_stu_class_num;
       // echo "<hr>";
       
       foreach($stu_class as $value){
       	$content = $content."第".$value['start_jie']."-".$value['end_jie']."节  ".$value['name']."  @".$value['place']."   ";
       	
       

       
   }
   }
   // echo $content;
		$arr = array(
           "touser" =>$stu_openid,
           "text" =>array( 
           	         "content" =>urldecode($content),
           	       ),
           "msgtype" =>"text",
			  );
		var_dump($arr);
		echo "<hr>";
		// $postJson =urldecode(json_encode($arr));
		 $res = curl_post_utf8($url,$arr);
		 var_dump($res);
	}
	
	}
    function get_self_url()
    {
        $sys_protocal = isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443' ? 'https://' : 'http://';
        $php_self = $_SERVER['PHP_SELF'] ? $_SERVER['PHP_SELF'] : $_SERVER['SCRIPT_NAME'];
        $path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '';
        $relate_url = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : $php_self . (isset($_SERVER['QUERY_STRING']) ? '?' . $_SERVER['QUERY_STRING'] : $path_info);
        return $sys_protocal . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '') . $relate_url;
    }



	//获取jsapi_ticket全局票据
    public function getJsApiTicket(){
    	//如果session中保存有效的jsapi_ticket
    	if ($_SESSION['jsapi_ticket_expire_time']>time()&& $_SESSION['jsapi_ticket']) {
    		$jsapi_ticket = $_SESSION['jsapi_ticket'];
    	}else{
    	$access_token = $this->getWxAccessToken();
    	$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".$access_token."&type=jsapi";
    	$res = $this->http_curl($url);
    	$jsapi_ticket = $res['ticket'];
    	$_SESSION['jsapi_ticket'] = $jsapi_ticket;
    	$_SESSION['jsapi_ticket_expire_time'] = time()+7000;
     }
     return $jsapi_ticket;

    }
    //获取16位随机码
   public function getRandCode(){
     $array = array(
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        '0','1','2','3','4','5','6','7','8','9', 
     );
     $tmpstr = '';
     $max = count($array);
     for ($i=1; $i<=16  ; $i++) { 
     	$key=rand(0,$max-1);
        $tmpstr .= $array[$key];
     }
     return $tmpstr;
   }

	public function s_coursedetail(){
      //1.获得jsapi_ticket
      $jsapi_ticket = $this->getJsApiTicket();
      // echo $jsapi_ticket;
      // echo "<hr>";
      $timestamp = time();
      // echo $timestamp;
      // echo "<hr>";
      $noncestr = $this->getRandCode();
      // echo $noncestr;
      // echo "<hr>";
      $url = $this->get_self_url();
      //获取$signature
      $signature = "jsapi_ticket=".$jsapi_ticket."&noncestr=".$noncestr."&timestamp=".$timestamp."&url=".$url;
      $signature = sha1($signature);
      // echo $signature;
      $this->assign('timestamp',$timestamp);
      $this->assign('noncestr',$noncestr);
      $this->assign('signature',$signature);
      // $this->display('wx:wx_share');
       $nowweek =I('get.nowweek');
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
       $this->display('wx:wx_S-Detail');
     
	}
  public function isrepeat($s_idlist,$s_id){
    $flag = true;
    foreach ($s_idlist as  $value) {
         if ($s_id != $value) {
             continue;
         }else{

             $flag = false;
         }
         return $flag;
         
    }
  }
	
  public function downFile(){
  	$c_id = I('post.c_id');
  	$nowweek = I('post.nowweek');
  	$media_id = I('post.serverid');
  	$s_id = session('student.userId');
  	$time = time();
  	$filepath = $this->saveMedia($media_id);
  	$imgModel = M('image_stu');
    // $s_idlist = $imgModel->where("c_id = '$c_id' and nowweek = '{$nowweek}'")->select();
    // if ($this->isrepeat($s_idlist,$s_id)) {
       

  	$data1 = array(
        'c_id' => $c_id,
        'nowweek' => $nowweek,
        'src' => $filepath,
        's_id' => $s_id,
        'time' => $time,
        'condition' => "待审核",
 

  		);
  	$imgModel->add($data1);
    
   
    // echo $filepath;
    // $this->assign('filepath',$filepath);
    // $this->display('wx:wx_Sign-in');
    
// }
  }
  function saveMedia($media_id){
        $access_token = $this->getWxAccessToken();
        $url = 'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token='.$access_token.'&media_id='.$media_id;
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HEADER, 0);    
        curl_setopt($ch, CURLOPT_NOBODY, 0);    //对body进行输出。
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $package = curl_exec($ch);
        $httpinfo = curl_getinfo($ch);
       
        curl_close($ch);
        $media = array_merge(array('mediaBody' => $package), $httpinfo);
        
        //求出文件格式
        preg_match('/\w\/(\w+)/i', $media["content_type"], $extmatches);
        $fileExt = $extmatches[1];
        $filename = time().rand(100,999).".{$fileExt}";
        //$dirname = "./Uploads/";
        if ($fileExt == 'amr') {//语音文件
            $dirname = "./Uploads/video/";
        }else{
            $dirname = "./Uploads/img/";
        }
        if(!file_exists($dirname)){
            mkdir($dirname,0777,true);
        }
        file_put_contents($dirname.$filename,$media['mediaBody']);
        if ($fileExt == 'amr') {//语音文件
            $this->amrToMp3($filename);
            $filename = substr($filename, 0, strlen($filename)-4).'.mp3';
        }
        return $dirname.$filename;
    }


}