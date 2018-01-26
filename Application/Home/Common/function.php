<?php
function sweetAlert($message,$title='',$type=1,$js = '')
{

    switch($type)
    {
        case 1:$icon = 'success';break;
        case 2:$icon = 'warning';break;
        case 3:$icon = 'error';break;
        default:$icon = '';break;
    }

    $valHtml = '';
    $valHtml .= '<!doctype html>';
    $valHtml .= '<html>';
    $valHtml .= '<head>';
    $valHtml .= '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />';
    $valHtml .= '<meta charset="utf-8"/>';
    $valHtml .= '<script src="http://php.shuochuang.net/hdd/Public/sweetalert/sweetalert.min.js"></script> <link rel="stylesheet" type="text/css" href="http://php.shuochuang.net/hdd/Public/sweetalert/sweetalert.css">';
    $valHtml .= '<script>';
    $valHtml .= "window.onload = function(){swal(";
    if($message != "") $valHtml .= "{text: '".$message."', ";
    if($title != "") $valHtml .= "title: '".$title."', ";
    if($type != 0) $valHtml .= "type: '".$icon."'";
    $valHtml .= "},function(){ ";
    if($js != '') $valHtml .= $js;
    $valHtml .= '});}</script>';
    $valHtml .= '</head>';
    $valHtml .= '<body>';
    $valHtml .= '</body>';
    $valHtml .= '</html>';
    return $valHtml;
}



function curl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}

function curl_post($url, $postData)
{
    $data = urldecode(json_encode($postData));
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // $data JSON类型字符串
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data)
    ));
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}

function curl_post_utf8($url, $postData)
{
    $data = urldecode(json_encode(url_encode($postData)));
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data); // $data JSON类型字符串
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data)
    ));
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}

function url_encode($str) {  
    if(is_array($str)) {  
        foreach($str as $key=>$value) {  
            $str[urlencode($key)] = url_encode($value);  
        }  
    } else {  
        $str = urlencode($str);  
    }  
      
    return $str;  
}  

function wx_kfsend_txt($access_token, $openid, $txt)
{
    $url = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' . $access_token;
    unset($postData);
    $postData['touser'] = $openid;
    $postData['msgtype'] = 'text';
    $postData['text']['content'] = urlencode($txt);
    return curl_post($url, $postData);
}


/**
 * 设置消息
 */
function setMessgae($uid, $message)
{
    unset($data);
    $data['message'] = $message;
    $data['uid'] = $uid;
    $data['create_time'] = time();
    M('message')->add($data);
}


function exportExcel($expTitle,$expCellName,$expTableData){

    $xlsTitle = iconv('utf-8', 'gb2312', $expTitle);//文件名称
    $fileName = $xlsTitle.date('_YmdHis');//or $xlsTitle 文件名称可根据自己情况设定
    $cellNum = count($expCellName);
    $dataNum = count($expTableData);
    vendor("PHPExcel.PHPExcel");
     
    $objPHPExcel = new \PHPExcel();
    $cellName = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ');

    $objPHPExcel->getActiveSheet(0)->mergeCells('A1:'.$cellName[$cellNum-1].'1');//合并单元格
    // $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A1', $expTitle.'  Export time:'.date('Y-m-d H:i:s'));
    for($i=0;$i<$cellNum;$i++){
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellName[$i].'2', $expCellName[$i][1]);
    }
    // Miscellaneous glyphs, UTF-8
    for($i=0;$i<$dataNum;$i++){
        for($j=0;$j<$cellNum;$j++){
            $objPHPExcel->getActiveSheet(0)->setCellValueExplicit($cellName[$j].($i+3), $expTableData[$i][$expCellName[$j][0]],PHPExcel_Cell_DataType::TYPE_STRING);
            $objPHPExcel->getActiveSheet(0)->getStyle($cellName[$j].($i+3))->getNumberFormat()->setFormatCode("@"); 
        }
    }
    $objPHPExcel->getActiveSheet()->getColumnDimension('P')->setWidth(30);

    header('pragma:public');
    header('Content-type:application/vnd.ms-excel;charset=utf-8;name="'.$xlsTitle.'.xls"');
    header("Content-Disposition:attachment;filename=$fileName.xls");//attachment新窗口打印inline本窗口打印
    $objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('php://output');
    exit;
}

function  log_result($file,$word)
{		
    $file= "./notify.log";//log文件路径
    
    $fp = fopen($file,"a");
    flock($fp, LOCK_EX) ;
    fwrite($fp,"执行日期：".date("Y-m-d H:i:s",time())." ".$word."\r\n");
    flock($fp, LOCK_UN);
    fclose($fp);
}


function getUser($tid)
{
    return $tid==0?null:array_reverse(explode('-', trim($tid,'-')));
}

function diffBetweenTwoDays ($day1, $day2)
{
    $second1 = strtotime($day1);
    $second2 = strtotime($day2);
      
    if ($second1 < $second2) {
        $tmp = $second2;
        $second2 = $second1;
        $second1 = $tmp;
    }
    return ($second1 - $second2) / 86400;
}


//获取用户书架总价
function getTotalPrice($uid){
    $price = 0;
    // $Model = D('book');
    // $books = $Model->where('uid = '.$uid)->select();
    // foreach ($books as $key => $value) {
    //     $data = $Model->getBook($value['bid']);
    //     $price += $data['price'];
    // }
    $books = M('book')->where('ishide = 1 AND uid = '.$uid)->field('price')->select();
    foreach ($books as $key => $value) {
        $price += $value['price'];
    }
    return number_format($price,2,'.','');
}


//获取省份
function getProvince($id){
    return M('province')->getFieldById($id,'name');
}

//获取城市
function getCity($id){
    return M('city')->getFieldById($id,'name');
}

//获取区
function getCounty($id){
    return M('county')->getFieldById($id,'name');
}


/*
 * 余额变动
 * $count 金额+-
 * $uid uid用户
 * $info 备注
 */
function changeMoney($uid,$count,$info){
    if ($uid <= 0) {
        return false;
    }else{
        $userModel = M('user');
        $moneyModel = M('money_record');

        if ($count == 0) {
            exit();
        }
        $count = number_format($count,2,'.','');
        $current = $userModel->getFieldById($uid,'money');
        if ($count<0) {
            $current = $current - abs($count);
            if ($current<0) {
                return false;
            }
            $data['type'] = 2;
        }else{
            $current = $current + $count;
            $data['type'] = 1;
        }

        $userModel->startTrans();//开启事务
        $userModel->where('id = '.$uid)->setField('money',$current);//修改余额

        $data['uid'] = $uid;
        $data['count'] = abs($count);
        $data['info'] = $info;
        $data['createtime'] = time();

        if ($moneyModel->add($data)) {
            $userModel->commit();//提交事务
            return true;
        }else{
            $userModel->rollback();//事务回滚
            return false;
        }
    }
}

//银行卡号Luhn验证算法
function luhm2($card){  
   if (!is_numeric($card)) return False;  
   $card_len = strlen($card);  
   $i = 0;  
   $num_i = array();  
   do{  
       if (!$i){  
           $num_x = $card_len % 2 ? 1 : 2;  
       } else {  
           $num_x = $num_x == 1 ? 2 : 1;      
       }  
       $num_i[$i] = (int)$card[$i] * $num_x;  
       $num_i[$i] = $num_i[$i] > 9 ? $num_i[$i] - 9 : $num_i[$i];  
   }while(isset($card[++$i]));  
   $num_sum = array_sum($num_i);  
   return $num_sum;  
}  
