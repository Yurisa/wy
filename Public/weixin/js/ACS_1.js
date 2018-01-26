/*
* @Author: Marte
* @Date:   2017-04-25 23:25:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-05-10 20:42:21
*/
var courseTime=1;
var timeValue;
var weekValue;
var bol_1=false;
var bol_2=false;
var bol_3=false;
window.onload=function(){
            var height_1=window.screen.height;
            var height_2=document.getElementById("header").offsetHeight+document.getElementById("search").offsetHeight;
            var width=document.getElementById("OuterTable").offsetWidth;
            document.getElementById("background").style.height=height_1-50+'px';
            document.getElementById("container_2").style.height=height_1-73+'px';
            var x = document.getElementsByClassName("tableTd");
                for (var i = 0; i < x.length;i++){
                   x[i].style.width=width+'px';
                }
            var list_1=document.getElementById("week_1");
            var list_2=document.getElementById("week_2");
            for(var i=1;i<24;i++){
                list_1.options.add(new Option(i+1,i+1));
                list_2.options.add(new Option(i+1,i+1));
            }
            document.getElementById("content").style.height=height_1-height_2-50+'px';
            document.getElementById("hItem1").onclick=function(){
                document.getElementById("container_1").style.display="block";
                document.getElementById("container_2").style.display="none";
                document.getElementById("hItemColor1").style.background="#09B830";
                document.getElementById("hItemColor2").style.background="#CFCFCF";
                document.getElementById("SearchValue").select();
            }
            document.getElementById("hItem2").onclick=function(){
                document.getElementById("container_1").style.display="none";
                document.getElementById("container_2").style.display="block";
                document.getElementById("hItemColor1").style.background="#CFCFCF";
                document.getElementById("hItemColor2").style.background="#FBCD21";
            }
            document.getElementById("addcoursetime").onclick=function(){
                var sourceNode=document.getElementById("ClassTable_1");
                var clonedNode = sourceNode.cloneNode(true);
                del_ff(clonedNode);
                var childNode_1=clonedNode.childNodes[0];
                childNode_1.value="";
                var childNode_2=clonedNode.childNodes[1];
                childNode_2.value="";
                var childNode_3=clonedNode.childNodes[2];
                childNode_3.value="";
                var childNode_4=clonedNode.childNodes[3];
                childNode_4.value="";
                var clonedWeek=clonedNode.rows[0].cells[2];
                del_ff(clonedWeek);
                clonedWeek=clonedWeek.childNodes[0];
                clonedWeek.value="";
                 //新添
                clonedWeek=clonedNode.rows[0].cells[2];
                del_ff(clonedWeek);
                clonedWeek=clonedWeek.childNodes[2];
                clonedWeek.value="";
                //新添
                var clonedTime=clonedNode.rows[1].cells[1];
                del_ff(clonedTime);
                clonedTime=clonedTime.childNodes[0];
                clonedTime.value="";
                var clonedLocation=clonedNode.rows[2].cells[2];
                del_ff(clonedLocation);
                clonedLocation=clonedLocation.childNodes[0];
                clonedLocation.value="";
                courseTime++;
                clonedNode.setAttribute("id", "ClassTable_" + courseTime);
                clonedNode.rows[0].cells[0].innerHTML="课时<br>"+courseTime;
                sourceNode.parentNode.appendChild(clonedNode);
            }



            document.getElementById("x4_1").onclick=function(e){
                var weekTable=document.getElementById("addWeek_table");
                var trNode;
                if(bol_1==false){
                    bol_1=true;
                    bol_2=false;
                    bol_3=false;
                    for(var i=0;i<4;i++){
                        trNode=weekTable.rows[i];
                        for(var p=0;p<6;p++){
                            if(p%2==0){
                            var tdNode=trNode.cells[p];
                            var tdInput=tdNode.childNodes[0];
                            tdNode.style.background="#09B830";
                            tdNode.style.color="#FFFFFF";
                            tdInput.value="1";
                            }else{
                            var tdNode=trNode.cells[p];
                            var tdInput=tdNode.childNodes[0];
                            tdNode.style.background="#FFFFFF";
                            tdNode.style.color="#000000";
                            tdInput.value="0";
                            }
                        }
                    }
                }else if(bol_1==true){
                    bol_1=false;
                 for(var i=0;i<4;i++){
                    for(var p=0;p<6;p++){
                        var tdNode=weekTable.rows[i].cells[p];
                        var tdInput=tdNode.childNodes[0];
                        tdNode.style.background="#FFFFFF";
                        tdNode.style.color="#000000";
                        tdInput.value="0";
                        document.getElementById("x4_1").checked=false;
                    }
                }
            }
        }
             document.getElementById("x4_2").onclick=function(){
                var weekTable=document.getElementById("addWeek_table");
                var trNode;
                if(bol_2==false){
                    bol_2=true;
                    bol_1=false;
                    bol_3=false;
                    for(var i=0;i<4;i++){
                        trNode=weekTable.rows[i];
                        for(var p=0;p<6;p++){
                            if(p%2!=0){
                            var tdNode=trNode.cells[p];
                            var tdInput=tdNode.childNodes[0];
                            tdNode.style.background="#09B830";
                            tdNode.style.color="#FFFFFF";
                            tdInput.value="1";
                        }else{
                            var tdNode=trNode.cells[p];
                            var tdInput=tdNode.childNodes[0];
                            tdNode.style.background="#FFFFFF";
                            tdNode.style.color="#000000";
                            tdInput.value="0";
                        }
                    }
                }
            }else if(bol_2==true){
                bol_2=false;
                for(var i=0;i<4;i++){
                    for(var p=0;p<6;p++){
                        var tdNode=weekTable.rows[i].cells[p];
                        var tdInput=tdNode.childNodes[0];
                        tdNode.style.background="#FFFFFF";
                        tdNode.style.color="#000000";
                        tdInput.value="0";
                        document.getElementById("x4_2").checked=false;
                    }
                }
            }
        }
            document.getElementById("x4_3").onclick=function(){
                var weekTable=document.getElementById("addWeek_table");
                if(bol_3==false){
                    bol_3=true;
                    bol_1=false;
                    bol_2=false;
                    for(var i=0;i<4;i++){
                        for(var p=0;p<6;p++){
                            var tdNode=weekTable.rows[i].cells[p];
                            var tdInput=tdNode.childNodes[0];
                            tdNode.style.background="#09B830";
                            tdNode.style.color="#FFFFFF";
                            tdInput.value="1";
                        }
                    }
                }else if(bol_3==true){
                    bol_3=false;
                    for(var i=0;i<4;i++){
                        for(var p=0;p<6;p++){
                            var tdNode=weekTable.rows[i].cells[p];
                            var tdInput=tdNode.childNodes[0];
                            tdNode.style.background="#FFFFFF";
                            tdNode.style.color="#000000";
                            tdInput.value="0";
                            document.getElementById("x4_3").checked=false;
                        }
                    }
                }
            }

            //点击添加上课时间初始化
            var childs=document.getElementById("addTime_contentDiv1").childNodes;
            var childs_1=document.getElementById("addTime_contentDiv2").childNodes;
            var childs_2=document.getElementById("addTime_contentDiv3").childNodes;
            var sourceNode;
            var day=new Array("二","三","四","五","六","日");

            for(var i=0;i<childs.length;i++){
                if(childs[i].nodeName=="LABEL"){
                    sourceNode=childs[i];
                    }
                }
            for(var a=0;a<6;a++){
                var clonedNode = sourceNode.cloneNode(true);
                clonedNode.htmlFor="x1_"+(a+2);
                del_ff(clonedNode);
                var child_0=clonedNode.childNodes[0];
                del_ff(child_0);
                child_0=child_0.childNodes[0];
                child_0.innerHTML="周"+day[a];
                var child_1=clonedNode.childNodes[1];
                del_ff(child_1);
                var child_2=child_1.childNodes[0];
                child_2.setAttribute("id","x1_"+(a+2));
                document.getElementById("addTime_contentDiv1").appendChild(clonedNode);
             }

            for(var i=0;i<childs_1.length;i++){
                if(childs_1[i].nodeName=="LABEL"){
                    sourceNode=childs_1[i];
                    }
                }
            for(var a=0;a<15;a++){
                var clonedNode = sourceNode.cloneNode(true);
                clonedNode.htmlFor="x2_"+(a+2);
                del_ff(clonedNode);
                var child_0=clonedNode.childNodes[0];
                del_ff(child_0);
                child_0=child_0.childNodes[0];
                child_0.innerHTML="第"+"<br>"+(a+2)+"<br>"+"节";
                var child_1=clonedNode.childNodes[1];
                del_ff(child_1);
                var child_2=child_1.childNodes[0];
                child_2.setAttribute("id","x2_"+(a+2));
                document.getElementById("addTime_contentDiv2").appendChild(clonedNode);
             }

             for(var i=0;i<childs_2.length;i++){
                if(childs_2[i].nodeName=="LABEL"){
                    sourceNode=childs_2[i];
                    }
                }
            for(var a=0;a<15;a++){
                 var clonedNode = sourceNode.cloneNode(true);
                clonedNode.htmlFor="x3_"+(a+2);
                del_ff(clonedNode);
                var child_0=clonedNode.childNodes[0];
                del_ff(child_0);
                child_0=child_0.childNodes[0];
                child_0.innerHTML="第"+"<br>"+(a+2)+"<br>"+"节";
                var child_1=clonedNode.childNodes[1];
                del_ff(child_1);
                var child_2=child_1.childNodes[0];
                child_2.setAttribute("id","x3_"+(a+2));
                document.getElementById("addTime_contentDiv3").appendChild(clonedNode);
             }
             //点击添加周数初始化
             var weekTable=document.getElementById("addWeek_table");
             var weekTable_td=weekTable.rows[0].cells[0];
             var weekNum=1;
             var trNode;
             for(var i=0;i<4;i++){
                trNode=weekTable.rows[i];
                if(i==0){
                    for(var p=0;p<5;p++){
                        var cloneTdNode=weekTable_td.cloneNode(true);
                        var cloneTdNode_span=cloneTdNode.childNodes[1];
                        weekNum++;
                        cloneTdNode_span.innerHTML=weekNum;
                        trNode.appendChild(cloneTdNode);
                    }
                }else{
                    for(var p=0;p<6;p++){
                        var cloneTdNode=weekTable_td.cloneNode(true);
                        var cloneTdNode_span=cloneTdNode.childNodes[1];
                        weekNum++;
                        cloneTdNode_span.innerHTML=weekNum;
                        trNode.appendChild(cloneTdNode);
                    }
                }
             }

        }
        function del_ff(elem){
            var elem_child = elem.childNodes;
            for(var i=0; i<elem_child.length;i++){
            if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
                elem.removeChild(elem_child[i]);
                    }
            }
        }

         function deletebox(val){
            var table=val.parentNode.parentNode.parentNode.parentNode;
            var tablearray=table.id.split("_");
            var tableid=parseInt(tablearray[1]);
            if(table.id=="ClassTable_1")
                alert("您不能删除课时1");
            else{
                for(var p=tableid+1;p<=courseTime;p++){
                    document.getElementById("ClassTable_"+p).rows[0].cells[0].innerHTML="课时<br>"+(p-1);
                    document.getElementById("ClassTable_"+p).setAttribute("id","ClassTable_"+(p-1));
                }
                document.getElementById("container_3").removeChild(table);
                courseTime--;
            }
        }
        function addtime(val){
            document.getElementById("addTime").style.display="block";
            timeValue=val;
            val.style.imeMode = 'disabled';
            var table=val.parentNode.parentNode.parentNode.parentNode;
            del_ff(table);
            var hiddenWeekValue=table.childNodes[0];
            hiddenWeekValue=hiddenWeekValue.value;
            var hiddenTimeValue_1=table.childNodes[1];
            hiddenTimeValue_1=hiddenTimeValue_1.value;
            var hiddenTimeValue_2=table.childNodes[2];
            hiddenTimeValue_2=hiddenTimeValue_2.value;
            if(hiddenWeekValue==""&&hiddenTimeValue_1==""&&hiddenTimeValue_2==""){
                document.getElementById("addTime_contentDiv1").scrollTop=0;
                document.getElementById("addTime_contentDiv2").scrollTop=0;
                document.getElementById("addTime_contentDiv3").scrollTop=0;
                document.getElementById("x1_1").checked=true;
                document.getElementById("x2_1").checked=true;
                document.getElementById("x3_1").checked=true;
            }else{
                document.getElementById("addTime_contentDiv1").scrollTop=50*(hiddenWeekValue-1);
                document.getElementById("addTime_contentDiv2").scrollTop=78*(hiddenTimeValue_1-1);
                document.getElementById("addTime_contentDiv3").scrollTop=78*(hiddenTimeValue_2-1);
                document.getElementById("x1_"+hiddenWeekValue).checked=true;
                document.getElementById("x2_"+hiddenTimeValue_1).checked=true;
                document.getElementById("x3_"+hiddenTimeValue_2).checked=true;
            }
            document.getElementById("blackBg").style.width=window.screen.width+'px';
            document.getElementById("blackBg").style.height=window.screen.height+'px';
            document.getElementById("blackBg").style.display="block";
            document.getElementById("addTime").style.top=document.getElementById("container_2").scrollTop+110+'px';
            document.getElementById("addTime").style.left=25+'px';
        }
        function timeConfirm(){
            var str="";
            var str_1="";
            var node_1;
            var node_2;
            var day=new Array("一","二","三","四","五","六","日");
            var table=timeValue.parentNode.parentNode.parentNode.parentNode;
            del_ff(table);
            var hiddenWeekValue=table.childNodes[0];
            var hiddenTimeValue_1=table.childNodes[1];
            var hiddenTimeValue_2=table.childNodes[2];
            for(var i=0;i<7;i++){
                var node=document.getElementById("x1_"+(i+1));
                if(node.checked==true){
                    str+="周"+day[i];
                    hiddenWeekValue.value=i+1;
                }
            }
            for(var i=0;i<16;i++){
                var node=document.getElementById("x2_"+(i+1));
                if(node.checked==true){
                    str_1+=(i+1)+"-";
                    node_1=i+1;
                    hiddenTimeValue_1.value=i+1;
                }
            }
             for(var i=0;i<16;i++){
                var node=document.getElementById("x3_"+(i+1));
                if(node.checked==true){
                    str_1+=(i+1)+"节";
                    node_2=i+1;
                    hiddenTimeValue_2.value=i+1;
                }
            }
            if(node_1>node_2){
                alert("不能选择结束节数小于开始节数的选项!");
                document.getElementById("addTime_contentDiv2").scrollTop=0;
                document.getElementById("x2_1").checked=true;
            }
            else if(node_1==node_2){
                str_1="第"+node_1+"节";
                str+=str_1;
                timeValue.value=str;
                document.getElementById("addTime").style.display="none";
                document.getElementById("blackBg").style.display="none";
            }else if(node_1<node_2){
                str+=str_1;
                timeValue.value=str;
                document.getElementById("addTime").style.display="none";
                document.getElementById("blackBg").style.display="none";
            }
        }
        function timeCancel(){
            document.getElementById("x1_1").checked=true;
            document.getElementById("x2_1").checked=true;
            document.getElementById("x3_1").checked=true;
            document.getElementById("addTime").style.display="none";
            document.getElementById("blackBg").style.display="none";
        }
        function addWeek(val){
            document.getElementById("addWeek").style.display="block";
            var weekTable=document.getElementById("addWeek_table");
            weekValue=val;
            var table=val.parentNode.parentNode.parentNode.parentNode;
            del_ff(table);
            var weekTime=table.childNodes[3];
            var str=weekTime.value;
            if(str==""){
                for(var i=0;i<4;i++){
                    for(var p=0;p<6;p++){
                        var tdNode=weekTable.rows[i].cells[p];
                        var tdInput=tdNode.childNodes[0];
                        tdNode.style.background="#FFFFFF";
                        tdNode.style.color="#000000";
                        tdInput.value="0";
                    }
                }
            }else{
                for(var i=0;i<4;i++){
                    for(var p=0;p<6;p++){
                        var tdNode=weekTable.rows[i].cells[p];
                        var tdInput=tdNode.childNodes[0];
                        tdNode.style.background="#FFFFFF";
                        tdNode.style.color="#000000";
                        tdInput.value="0";
                    }
                }
                var array=str.split(",");
                for(var x=0;x<array.length;x++){
                    var num=parseInt(array[x]);
                    var col=0;
                    var row=0;
                    if(num%6>0){
                        row=num/6+1;
                        col=num%6;
                    }else{
                        row=num/6;
                        col=6;
                    }
                    row=parseInt(row);
                    var tdNode=weekTable.rows[row-1].cells[col-1];
                    var tdInput=tdNode.childNodes[0];
                    tdNode.style.background="#09B830";
                    tdNode.style.color="#FFFFFF";
                    tdInput.value="1";
                }
            }
            checkSe();
            document.getElementById("blackBg").style.width=window.screen.width+'px';
            document.getElementById("blackBg").style.height=window.screen.height+'px';
            document.getElementById("blackBg").style.display="block";
            document.getElementById("addWeek").style.top=document.getElementById("container_2").scrollTop+100+'px';
            document.getElementById("addWeek").style.left=25+'px';
        }
        function weekConfirm(){
            var table=weekValue.parentNode.parentNode.parentNode.parentNode;
            var weekTable=document.getElementById("addWeek_table");
            del_ff(table);
            var hiddenValue=table.childNodes[3];
            var str_1="";
            var str_2="";
            for(var i=0;i<4;i++){
                for(var p=0;p<6;p++){
                    var tdNode=weekTable.rows[i].cells[p];
                    var tdInput=tdNode.childNodes[0];
                    if(tdInput.value=="1"){
                        str_1+=(6*i)+(p+1)+",";
                    }
                }
            }
            str_1=str_1.substr(0,str_1.length-1);
            hiddenValue.value=str_1;
            var numArray_1=str_1.split(",");
            var numArray_2=[];
            for(var i=0;i<numArray_1.length;i++){
                numArray_2[i]=parseInt(numArray_1[i]);
            }
            var result = [];
            var tmp;
            while(tmp = numArray_2.shift()){
             if(result.length == 0){
                result.push([tmp]);
                continue;
                }
                var e = result[result.length - 1];
                if(tmp == e[e.length - 1] + 1){
                e.push(tmp);
             }else{
                result.push([tmp]);
            }
        }
            for(var i=0;i<result.length;i++){
                    if(result[i].length==1){
                        str_2+=result[i]+",";
                    }else{
                        str_2+=result[i][0]+"-"+result[i][result[i].length-1]+",";
                    }
                }
            str_2=str_2.substr(0,str_2.length-1);
            if(str_2==""){
                weekValue.value=str_2;
            }else{
                str_2+="周";
                weekValue.value=str_2;
            }
            if(bol_1==true){
                weekValue.value="1-23周（单周）";
            }else if(bol_2==true){
                weekValue.value="2-24周（双周）";
            }
            document.getElementById("addWeek").style.display="none";
            document.getElementById("blackBg").style.display="none";
        }
        function weekCancel(){
            document.getElementById("addWeek").style.display="none";
            document.getElementById("blackBg").style.display="none";
        }
        function changeStatus(val){
            var tdInput=val.childNodes[0];
            var weekTable=document.getElementById("addWeek_table");
            if(tdInput.value=="0"){
                val.style.background="#09B830";
                val.style.color="#FFFFFF";
                tdInput.value="1";
            }else if(tdInput.value=="1"){
                val.style.background="#FFFFFF";
                val.style.color="#000000";
                tdInput.value="0";
            }
            checkSe();
        }
        function checkSe(){
            var check_1=true;
            var check_2=true;
            var check_3=true;
            var weekTable=document.getElementById("addWeek_table");
            outerloop:
            for(var i=0;i<4;i++){
                trNode=weekTable.rows[i];
                for(var p=0;p<6;p++){
                    var tdNode=trNode.cells[p];
                    var tdInput=tdNode.childNodes[0];
                    if(p%2==0&&tdInput.value=="1"){
                        check_1=true;
                    }else if(p%2==0&&tdInput.value=="0"){
                        check_1=false;
                        break outerloop;
                    }else if(p%2!=0&&tdInput.value=="0"){
                        check_1=true;
                    }else if(p%2!=0&&tdInput.value=="1"){
                        check_1=false;
                        break outerloop;
                    }
                }
            }
            outerloop_1:
            for(var i=0;i<4;i++){
                trNode=weekTable.rows[i];
                for(var p=0;p<6;p++){
                    var tdNode=trNode.cells[p];
                    var tdInput=tdNode.childNodes[0];
                    if(p%2==0&&tdInput.value=="0"){
                        check_2=true;
                    }else if(p%2==0&&tdInput.value=="1"){
                        check_2=false;
                        break outerloop_1;
                    }else if(p%2!=0&&tdInput.value=="1"){
                        check_2=true;
                    }else if(p%2!=0&&tdInput.value=="0"){
                        check_2=false;
                        break outerloop_1;
                    }
                }
            }
            outerloop_2:
            for(var i=0;i<4;i++){
                trNode=weekTable.rows[i];
                for(var p=0;p<6;p++){
                    var tdNode=trNode.cells[p];
                    var tdInput=tdNode.childNodes[0];
                    if(tdInput.value=="1"){
                        check_3=true;
                    }else if(tdInput.value=="0"){
                        check_3=false;
                        break outerloop_2;
                    }
                }
            }
            if(check_1){
                bol_1=true;
                document.getElementById("x4_1").checked=true;
            }else{
                bol_1=false;
                document.getElementById("x4_1").checked=false;
            }
            if(check_2){
                bol_2=true;
                document.getElementById("x4_2").checked=true;
            }else{
                bol_2=false;
                document.getElementById("x4_2").checked=false;
            }
            if(check_3){
                bol_3=true;
                document.getElementById("x4_3").checked=true;
            }else{
                bol_3=false;
                document.getElementById("x4_3").checked=false;
            }
        }
         function changeSelect(val){
            var list_1=val;
            var list_2=list_1.parentNode.getElementsByTagName("select")[1];
            var index=list_1.selectedIndex;
            var value=list_1.options[index].value;
            list_2.options.length=0;
            for(var i=value;i<=24;i++){
                 list_2.options.add(new Option(i,i));
            }
        }

