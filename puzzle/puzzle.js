//保存定时时间
var time=0;
//设置是否暂停标志，true表示暂停
var pause=true;
//设置定时函数
var set_timer;
//保存大DIV当前装的小DIV的编号
var d=new Array(10);
//默认按照顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块
d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;
//保存大DIV编号的可移动位置编号
var d_direct=new Array(
    [0],//为了逻辑更简单，第一个元素我们不用，我们从下标1开始使用
    [2,4],//大DIV编号为1的DIV可以去的位置，比如第一块可以去2,4号位置
    [1,3,5],
    [2,6],
    [1,5,7],
    [2,4,6,8],
    [3,5,9],
    [4,8],
    [5,7,9],
    [6,8]
);
//大DIV编号的位置，10位
var d_posXY=new Array(
    [0],//同样，我们不使用第一个元素
    [0,0],//第一个表示left,第二个表示top，比如第一块的位置为let:0px,top:0px
    [150,0],
    [300,0],
    [0,150],
    [150,150],
    [300,150],
    [0,300],
    [150,300],
    [300,300]
);



//移动函数
function move(id){
    for(var i=1;i<10;i++){
        if(d[i]==id)//找出小DIV在大DIV中的位置i
            break;
    }
    //保存小DIV可以去的编号，0表示不能移动
    var target_d=0;
    //用来找出小DIV可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的位置编号
    target_d=whereCanTo(i);

    //如果target_d不为0，则表示可以移动，且target_d就是小DIV要去的大DIV的位置编号
    if(target_d!=0){
        d[i]=0;///把当前的大DIV编号设置为0，因为当前小DIV已经移走了，所以当前大DIV就没有装小DIV了
        d[target_d]=id;//把目标大DIV设置为被点击的小DIV的编号
        //最后设置被点击的小DIV的位置，把它移到目标大DIV的位置
        document.getElementById("d"+id).style.left=d_posXY[target_d][0]+"px";
        document.getElementById("d"+id).style.top=d_posXY[target_d][1]+"px";
    }


    //设置游戏是否完成标志，true表示完成
    var finish_flag=true;
    for(var k=1;k<9;k++){
        if(d[k]!=k){
            finish_flag=false;
            break;
        }
    }
    if(finish_flag==true){
        if(!pause)//pause=false，表示是暂停阶段
            start();
        alert("congratulations!");
    }
}



//判断是否可移动函数
function whereCanTo(cur_div){//参数是大DIV的编号
    var j=0;
    var move_flag=false;
    for(j=0;j<d_direct[cur_div].length;j++){//把所有可能去的位置循环遍历一下
        if(d[d_direct[cur_div][j]] == 0){//如果目标的值为0，说明目标位置没有装小DIV，则可以移动，跳出循环
            move_flag=true;
            break;
        }
    }
 //可以移动，则返回目标位置的编号，否则返回0，表示不可移动   
    if(move_flag == true){
        return d_direct[cur_div][j];
    }else{
        return 0;
    }
}



//定时函数
function timer(){
    time+=1;
    var min=parseInt(time/60);//分
    var sec=time%60;//秒
    document.getElementById("timer").innerHTML=min+"分"+sec+"秒";
}
//开始暂停函数
function start(){
    if(pause){
        for(var l=1;l<9;l++){//点击开始，使所有点击事件有效
            document.getElementById("d"+l).setAttribute("onclick","move("+l+")");
        }
        document.getElementById("start").innerHTML="暂停";
        pause=false;
        set_timer=setInterval(timer,1000);
    }else{
        document.getElementById("start").innerHTML="开始";
        for(var s=1;s<9;s++){//暂停时使所有点击事件失效
            document.getElementById("d"+s).removeAttribute("onclick");
            document.getElementById("d"+s).onclick=function(){
                alert("请点击开始按钮！");
            }
        }
        pause=true;
        clearInterval(set_timer);
    }
}
//重置函数
function reset(){
    time=0;
    random_d();//把方块随机打乱
    if(pause){
        start();
    }
}
//随机打乱方块函数(可从第九块开始，随机生成一个数，然后他们两块对调一下)
function random_d(){
    for(var i=9;i>1;i--){
        var to=parseInt(Math.random()*(i-1)+1);//1到（i-1）之间的随机数
        if(d[i]!=0){//把当前的DIV位置设置为随机产生的DIV的位置
            document.getElementById("d"+d[i]).style.left=d_posXY[to][0]+"px";
            document.getElementById("d"+d[i]).style.top=d_posXY[to][1]+"px";
        }
        if(d[to]!=0){//把随机产生的DIV的位置设置为当前的DIV的位置
            document.getElementById("d"+d[to]).style.left=d_posXY[i][0]+"px";
            document.getElementById("d"+d[to]).style.top=d_posXY[i][1]+"px";            
        }
        //把它们两个的DIV保存的编号对调一下
        var temp=d[to];
        d[to]=d[i];
        d[i]=temp;
    }
}

//初始化函数
window.onload=function(){
    reset();//页面加载的时候调用重置函数，重新开始
}