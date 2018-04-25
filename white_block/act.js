var clock=null;


function init(){
    speed=4;
    state=0;

    if(state==0){
        //添加onclick事件
        $('main').onclick=function(e){
            judge(e);
        }
    }

    while(con.childNodes.length){
        con.removeChild(con.lastChild);
    }

        
    //分值清零
    $('score').innerHTML=0;
    for(var i=0;i<4;i++){
        createrow();
    }

    // 定时器 每30毫秒调用一次move()
    clock=window.setInterval('move()',30);
}


//第一步：初始化准备
//创建div, 参数className是其类名
function creatediv(className){
    var div=document.createElement('div');
    div.className=className;
    return div;
}
//根据id来get DOM元素
function $(id){
    return document.getElementById(id);
}

// 创造一个<div class="row">并且有四个子节点<div class="cell">
function createrow(){
    var con=$('con');
    var row=creatediv('row');//创建div class='row'
    var arr=createcell();//创建cell白黑块(类名)

    con.appendChild(row);//添加row为con的子节点
    for(var i=0;i<4;i++){
        row.appendChild(creatediv(arr[i]));//添加row的四个黑白块
    }


    if(con.firstChild == null){//第一个孩子在第一行，而不是第四行
        con.appendChild(row);
    }else{
        con.insertBefore(row,con.firstChild);
    }

}
 //创建一个类名的数组，其中一个为cell black, 其余为cell //创建一个类名的数组，其中一个为cell black, 其余为cell
 function createcell(){
     var temp=['cell','cell','cell','cell'];
     var i=Math.floor(Math.random()*4);//随机生成黑块的位置
     temp[i]='cell black';
     return temp;
 }




//第二步：让黑块动起来

//使黑块向下移动
function move(){
    var con=$('con');
    var top=parseInt(window.getComputedStyle(con,null)['top']);
    //getComputedStyle()获取当前元素所有最终使用的CSS属性值,第2个参数为伪类

    if(speed+top>0){
        top=0;
    }else{
        top+=speed;
    }
    con.style.top=top+'px';//设置元素的上边界

    if(top==0){
        createrow();
        con.style.top='-100px';
        delrow();
    }else if(top==(-100+speed)){
        var rows=con.childNodes;
        //var last=rows.lastElementChild;
       // console.log(con.childNodes.length);//这里还包括文本和注释节点
        if((con.childElementCount==5)&&(rows[rows.length-1].pass !== 1)){
            fail();
        }
    }
}

//判断是否点击了黑块
function judge(ev){
    if(ev.target.className.indexOf('black')!=-1){
        ev.target.className='cell';
        ev.target.parentNode.pass=1;//定义属性pass，表明此行row的黑块已经被点击
        score();
    }
}
//删除#con的最后一行，子节点.row
function delrow(){
    var con=$('con');
    //console.log(con.childElementCount);
    console.log(con.childElementCount)
    if(con.childNodes.length==6){//
        con.removeChild(con.lastChild);
    }
}
//计分
function score(){
    var newscore=parseInt($('score').innerHTML)+1;
    $('score').innerHTML=newscore;
    if(newscore%10==0){
        speedup();
    }
}
//加速
function speedup(){
    speed+=2;
    if(speed==20){
        alert('你超神了');
    }
}
//失败
function fail(){
    clearInterval(clock);
    state=1;//失败之后，白黑块点击失效
    confirm("你的最终得分为："+parseInt($('score').innerHTML));
}

//开始游戏
function begin(){
    init();
}
