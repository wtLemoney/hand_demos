### 绚丽小球 ###

简单js实现鼠标滑过的地方小球出现，过会消失。主要用来熟悉js的类和类的继承，及其运用。
具体实现思路：

1.获取当前的画布
2.小球类
```js
	class Ball{
		constructor（x,y,color）{
				...
			}
		...
		//canvas绘制小球
		render(){...}
	}
```
3.会移动的小球类
```js
	class MoveBall extends Ball{
		constructor（x,y,color）{
				super(x,y,color);
				//小球量的变化
				this.dX=Math.random(-5,5);
				...
			}
		...
		//更新
		upDate(){
			this.x+=this.dX;
			...
			//半径处理
		}
	}
```
4.实例化小球
5.监听鼠标的移动
```
	canvas.addEventListener('mousemove',function(){...})
```
6.开启定时器
```
	setInterval(function(){
				//清屏
				ctx.clearRect(0,0,canvas.width,canvas.height);

				for(let i=0;i<ballArr.length;i++){
					ballArr[i].render();
					ballArr[i].upDate();
				}
			},50);
```

<img src="ball1.jpg"  height="250" width="340"> <img src="ball2.jpg"  height="250" width="340">