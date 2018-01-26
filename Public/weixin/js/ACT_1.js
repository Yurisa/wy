/*
* @Author: Marte
* @Date:   2017-04-25 23:25:57
* @Last Modified by:   Marte
* @Last Modified time: 2017-04-28 18:11:21
*/
var i=1;
window.onload=function(){
            var height_1=window.screen.height;
            var height_2=document.getElementById("header").offsetHeight+document.getElementById("search").offsetHeight;
            var width=document.getElementById("OuterTable").offsetWidth;
            document.getElementById("background").style.height=height_1-50+'px';
            document.getElementById("container_2").style.height=height_1-73+'px';
            var x = document.getElementsByClassName("tableTd");
                for (var i = 0; i < x.length[i].style.width=width+'px';
                x[i].style.width=width+'px';
                }
            document.getElementById("content").style.height=height_1-height_2-50+'px';
            // document.getElementById("hItem1").onclick=function(){
            //     document.getElementById("container_1").style.display="block";
            //     document.getElementById("container_2").style.display="none";
            //     document.getElementById("hItemColor1").style.background="#607D8B";
            //     document.getElementById("hItemColor2").style.background="#CFCFCF";
            //     document.getElementById("SearchValue").select();
            // }
            // document.getElementById("hItem2").onclick=function(){
            //     document.getElementById("container_1").style.display="none";
            //     document.getElementById("container_2").style.display="block";
            //     document.getElementById("hItemColor1").style.background="#CFCFCF";
            //     document.getElementById("hItemColor2").style.background="#607D8B";
            // }
            document.getElementById("addcoursetime").onclick=function(){
                var sourceNode=document.getElementById("ClassTable_1");
                var clonedNode = sourceNode.cloneNode(true);
                i++;
                clonedNode.setAttribute("id", "ClassTable_" + i);
                clonedNode.rows[0].cells[0].innerHTML="课时<br>"+i;
                sourceNode.parentNode.appendChild(clonedNode);
            }
        }
         function deletebox(val){
            var table=val.parentNode.parentNode.parentNode.parentNode;
            var tablearray=table.id.split("_");
            var tableid=parseInt(tablearray[1]);
            if(table.id=="ClassTable_1")
                alert("您不能删除课时1");
            else{
                for(var p=tableid+1;p<=i;p++){
                    document.getElementById("ClassTable_"+p).rows[0].cells[0].innerHTML="课时<br>"+(p-1);
                    document.getElementById("ClassTable_"+p).setAttribute("id","ClassTable_"+(p-1));
                }
                document.getElementById("container_3").removeChild(table);
                i--;
            }
        }
