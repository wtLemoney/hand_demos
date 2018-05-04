//初始化
var postFile={
    init:function(){
        var t=this;
        t.regional=document.getElementById("label");
        t.getImage=document.getElementById("get_image");
        t.editPic=document.getElementById("edit_pic");
        t.editBox=document.getElementById("cover_box");
        t.px=0;//在实时预览区域的背景图片的坐标
        t.py=0;
        t.sx=15;//裁剪区域图片的横纵坐标和宽高
        t.sy=15;
        t.sHeight=100;
        t.sWidth=100;
        document.getElementById("post_file").addEventListener("change",t.handleFiles,false);

        //保存截图
        document.getElementById("save_button").onclick=function(){
            t.editPic.height=t.sHeight;
            t.editPic.width=t.sWidth;

            var ctx=t.editPic.getContext("2d");
            var images=new Image();
            images.src=t.imgUrl;

            images.onload=function(){
                ctx.drawImage(images,t.sx, t.sy, t.sHeight, t.sWidth, 0, 0, t.sHeight, t.sWidth); 
                document.getElementById('show_pic').getElementsByTagName('img')[0].src = t.editPic.toDataURL();
            }
        }
    },

    //实现 handleFiles，获取文件，读取文件并生成 url
    handleFiles: function () {
        var fileList=this.files[0];
console.log(this.files[0]);
        //FileReader主要用于将文件内容读入内存，通过一系列异步接口，可以在主线程中访问本地文件。
        var oFReader=new FileReader();
        oFReader.readAsDataURL(fileList);//将文件读取为 DataURL
        oFReader.onload=function (oFREvent) {
console.log(oFREvent);
console.log(oFREvent.target.result);
            postFile.paintImage(oFREvent.target.result);//oFREvent.target.result需要上传图片的地址
        };
    },

    //由 url 实现 paintImage 方法
    paintImage:function(url){
        /*如果用img直接插入页面，就无法自适应居中了，
        如果使用canvas绘制图片，不但能使图片自适应居
        中以及能等比例缩放，并且方便把图片的坐标，尺
        寸大小传给后来的遮罩层(id为label的div)，这样
        能根据图片的坐标以及图片的尺寸大小来绘制遮罩层。*/ 
       var t=this;
       var createCanvas=t.getImage.getContext("2d") ;
       var img=new Image();

       img.src=url;
       img.onload=function(){//将图片按照原大小等比例地重画出来
            if(img.width < t.regional.offsetWidth&&img.height < t.regional.offsetHeight){
                t.imgWidth=img.width;
                t.imgHeight=img.height;
            }else{
                var pWidth=img.width/(img.height/t.regional.offsetHeight);
                var pHeight=img.height/(img.width/t.regional.offsetWidth);
                t.imgWidth=img.width > img.height ? t.regional.offsetWidth : pWidth;
                t.imgHeight=img.height > img.width ? t.regional.offsetHeight : pHeight;
            }
console.log(img.width,img.height);//原图片宽高
console.log(t.imgWidth,t.imgHeight);
console.log(t.pWidth,t.pHeight);
console.log(t.regional.offsetWidth,t.regional.offsetHeight);

            t.px=(t.regional.offsetWidth-t.imgWidth)/2+"px";
            t.py=(t.regional.offsetHeight-t.imgHeight)/2+"px";
console.log(t.px,t.py);
            t.getImage.height=t.imgHeight;
            t.getImage.width=t.imgWidth;
            t.getImage.style.left=t.px;
            t.getImage.style.top=t.py;

console.log(img);
            createCanvas.drawImage(img,0,0,t.imgWidth,t.imgHeight);
            t.imgUrl=t.getImage.toDataURL();
            t.cutImage();
            t.drag();
       }
    },

    //实现cutImage方法
    cutImage:function(){
        var t=this;

        t.editBox.height=t.imgHeight;
        t.editBox.width=t.imgWidth;
        t.editBox.style.display='block';
        t.editBox.style.left=t.px;
        t.editBox.style.top=t.py;

        var cover=t.editBox.getContext("2d");
        cover.fillStyle="rgba(0,0,0,0.5)";
        cover.fillRect(0,0,t.imgWidth,t.imgHeight);
        cover.clearRect(t.sx,t.sy,t.sWidth,t.sHeight);

        document.getElementById("show_edit").style.background="url("+t.imgUrl+") "+ -t.sx +"px "+ -t.sy + "px no-repeat" ;
        document.getElementById("show_edit").style.height=t.sHeight+"px";
        document.getElementById("show_edit").style.width=t.sWidth+"px";
    },

    //编写drag方法(裁剪框的变动)
    drag:function(){
        var t=this;
        var draging=false;
        var startX=0;
        var startY=0;

        document.getElementById("cover_box").onmousemove=function(e){
            //e.pageX鼠标到浏览器左边缘的距
            var pageX=e.pageX-(t.regional.offsetLeft+this.offsetLeft);
            var pageY=e.pageY-(t.regional.offsetTop+this.offsetTop);

            //判断鼠标是否在图片的区域内部。
            if(pageX>t.sx && pageX<t.sx+t.sWidth && pageY>t.sy && pageY<t.sy+t.sHeight){
                this.style.cursor="move";//此光标指示某对象可被移动

                this.onmousedown=function(){
                    draging=true;

                    t.ex=t.sx;//上一次截图时候的坐标
                    t.ey=t.sy;

console.log(this.offsetLeft,this.offsetTop);
                    //鼠标按下时候的坐标
                    startX=e.pageX-(t.regional.offsetLeft+this.offsetLeft);
                    startY=e.pageY-(t.regional.offsetTop+this.offsetTop);
                }
                window.onmouseup=function(){
                    draging=false;
                }

                if(draging){

                    //移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)
                    if ( t.ex + (pageX - startX) < 0 ) {
                        t.sx = 0;
                    } else if ( t.ex + (pageX - startX) + t.sWidth > t.imgWidth) {
                        t.sx = t.imgWidth - t.sWidth;
                    } else {
                        t.sx = t.ex + (pageX - startX);
                    };

                    if (t.ey + (pageY - startY) < 0) {
                        t.sy = 0;
                    } else if ( t.ey + (pageY - startY) + t.sHeight > t.imgHeight ) {
                        t.sy = t.imgHeight - t.sHeight;
                    } else {
                        t.sy = t.ey + (pageY - startY);
                    }

                    t.cutImage();
                }
            }else{
                this.style.cursor="auto";//	默认。浏览器设置的光标。
            }
        }


    }


}

postFile.init();